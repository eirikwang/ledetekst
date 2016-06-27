package no.nav.sbl.ledeteksteditor.services;

import com.jcraft.jsch.Session;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.FileUtils;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
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

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>(){{
        put("sbl-veiledningarbeidssoker", "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git");
    }};

    static {
        SshSessionFactory.setInstance(new JschConfigSessionFactory() {
            @Override
            protected void configure(OpenSshConfig.Host host, Session session) {
                session.setConfig("StrictHostKeyChecking", "no");
            }
        });
    }

    public List<Ledetekst> hentAlleTeksterFor(String stashurl, String testDir) throws GitAPIException, IOException {
        List<File> filer = hentAlleLedeteksterFor(stashurl, testDir);
        return mapTilLedetekst(filer);
    }

    public List<File> hentAlleLedeteksterFor(String stashurl, String testDir) throws GitAPIException, IOException {
        Repository repo = FileUtils.hentTestRepo(stashurl, testDir);
        List<File> filer = GitWrapper.listFiles(repo);
        return filer.stream().filter(FileUtils.erLedetekstFil()).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) throws IOException {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {
            if(!FileUtils.matcherFilMonster(file)) continue;
            String nokkel = FileUtils.hentNokkel(file);
            String locale = FileUtils.hentLocale(file);
            String innholdFil = GitWrapper.getContentFromFile(file);
            innhold.computeIfAbsent(nokkel, (ignore) -> new HashMap<>()).put(locale, innholdFil);

        }
        return innhold.entrySet().stream().map(entry -> new Ledetekst(entry.getKey(), entry.getValue())).collect(Collectors.toList());
    }

}
