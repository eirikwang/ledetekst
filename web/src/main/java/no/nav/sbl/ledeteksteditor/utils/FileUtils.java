package no.nav.sbl.ledeteksteditor.utils;

import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileUtils {

    private static final Pattern FILE_PATTERN = Pattern.compile("(.*?)(_([a-zA-Z]{2}_?[a-zA-Z]{0,2}))?\\.([a-z]*)$");

    private File lagTestMappe(String mappeNavn) {
        Path homeDir = Paths.get(System.getProperty("user.home"));
        Path testDir = homeDir.resolve(mappeNavn);
        System.out.println(testDir.toAbsolutePath());
        File toReturn = testDir.toFile();
        System.out.println(File.separator);
        return toReturn;
    }

    public Repository hentTestRepo(String repoURL, String testMappeNavn) throws GitAPIException, IOException {
        return GitWrapper.getRepo(repoURL, lagTestMappe(testMappeNavn));
    }

    public String hentNokkel(File tekstFil) {
        String filsti = tekstFil.getPath();
        Matcher matcher = FILE_PATTERN.matcher(filsti);
        if(matcher.find()) {
            return filsti.substring(filsti.lastIndexOf(File.separator) + 1, filsti.lastIndexOf(matcher.group(2)));
        }
        return null;
    }

    public String hentLocale(File tekstFil) {
        String filsti = tekstFil.getPath();
        Matcher matcher = FILE_PATTERN.matcher(filsti);
        if(matcher.find()) {
            return filsti.substring(filsti.lastIndexOf(matcher.group(3)), filsti.lastIndexOf("."));
        }
        return null;
    }
}
