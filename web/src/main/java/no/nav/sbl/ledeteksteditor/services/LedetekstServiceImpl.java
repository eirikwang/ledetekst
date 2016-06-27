package no.nav.sbl.ledeteksteditor.services;

import com.jcraft.jsch.Session;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.GitWrapperException;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.JschConfigSessionFactory;
import org.eclipse.jgit.transport.OpenSshConfig;
import org.eclipse.jgit.transport.SshSessionFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("sbl-veiledningarbeidssoker", "http://stash.devillo.no/scm/sbl/veiledningarbeidssoker.git");
    }};
    private static final String FILE_PATH = "tekster" + File.separator + "src" + File.separator + "main" + File.separator + "tekster";
    private final static Predicate<File> erLedetekstFil = (File p) -> p.getPath().contains(FILE_PATH);
    private static final Pattern FILE_PATTERN = Pattern.compile("(.*?)(_([a-zA-Z]{2}_?[a-zA-Z]{0,2}))?\\.([a-z]*)$");

    static {
        SshSessionFactory.setInstance(new JschConfigSessionFactory() {
            @Override
            protected void configure(OpenSshConfig.Host host, Session session) {
                session.setConfig("StrictHostKeyChecking", "no");
            }
        });
    }

    @Override
    public List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir) throws GitAPIException, IOException, GitWrapperException {
        List<File> filer = hentAlleLedeteksterFor(stashurl, fileDir);
        return mapTilLedetekst(filer);
    }

    @Override
    public List<File> hentAlleLedeteksterFor(String stashurl, File fileDir) throws GitAPIException, IOException, GitWrapperException {
        Repository repo = GitWrapper.getRepo(stashurl, fileDir);
        List<File> filer = GitWrapper.listFiles(repo);
        return filer.stream().filter(erLedetekstFil).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) throws IOException {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {
            String filsti = file.getPath();
            Matcher matcher = FILE_PATTERN.matcher(file.getPath());

            if (matcher.find()) {
                String nokkel = filsti.substring(filsti.lastIndexOf("\\") + 1, filsti.lastIndexOf(matcher.group(2)));
                String locale = file.getPath().substring(file.getPath().lastIndexOf(matcher.group(3)), file.getPath().lastIndexOf("."));
                String innholdFil = GitWrapper.getContentFromFile(file);
                innhold.computeIfAbsent(nokkel, (ignore) -> new HashMap<>()).put(locale, innholdFil);
            }

        }
        return innhold.entrySet().stream().map(entry -> new Ledetekst(entry.getKey(), entry.getValue())).collect(Collectors.toList());
    }

}
