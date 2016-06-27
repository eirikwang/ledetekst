package no.nav.sbl.ledeteksteditor.utils;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtils {

    public static File lagTestMappe(String mappeNavn) {
        Path homeDir = Paths.get(System.getProperty("user.home"));
        Path testDir = homeDir.resolve(mappeNavn);
        System.out.println(testDir.toAbsolutePath());
        return testDir.toFile();
    }
    /*
    public static File klonTestRepo(String repoURL){

    }
    */
    public static void main(String[] args){
        lagTestMappe("Documents/testMappe");

    }
}
