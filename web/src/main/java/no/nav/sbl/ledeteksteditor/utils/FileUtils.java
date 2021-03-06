package no.nav.sbl.ledeteksteditor.utils;

import java.io.File;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileUtils {

    public static final String FILE_PATH = "tekster" + File.separator + "src" + File.separator + "main" + File.separator + "tekster";
    private static final Pattern FILE_PATTERN = Pattern.compile("(.*?)(_([a-zA-Z]{2}_?[a-zA-Z]{0,2}))?\\.([a-z]*)$");

    public static boolean matcherFilMonster(File tekstFil) {
        String filsti = tekstFil.getPath();
        Matcher matcher = FILE_PATTERN.matcher(filsti);
        return matcher.find();
    }

    public static String hentNokkel(File tekstFil) {
        String filsti = tekstFil.getPath();
        Matcher matcher = FILE_PATTERN.matcher(filsti);
        matcher.matches();
        return filsti.substring(filsti.lastIndexOf(File.separator) + 1, filsti.lastIndexOf(matcher.group(2)));
    }

    public static String hentLocale(File tekstFil) {
        String filsti = tekstFil.getPath();
        Matcher matcher = FILE_PATTERN.matcher(filsti);
        matcher.matches();
        return filsti.substring(filsti.lastIndexOf(matcher.group(3)), filsti.lastIndexOf("."));
    }

    public static Predicate<File> erLedetekstFil() {
        return (File p) -> p.getPath().contains(FILE_PATH);
    }
}

