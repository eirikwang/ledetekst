package no.nav.sbl.ledeteksteditor.utils;

import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.utils.exception.ApplikasjonsException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static java.nio.file.StandardOpenOption.CREATE_NEW;

public class GitHelper {

    public static String createRepo(){
        File fileDir = createDirectory();
        GitWrapper.initAndCommitRepo(fileDir);
        return fileDir.getPath();
    }
    private static File createDirectory(){

        File fileDir;
        try {
            fileDir = Files.createTempDirectory("temp").toFile();
        } catch (IOException e) {
            throw new ApplikasjonsException(e);
        }
        return fileDir;
    }

    public static String createTestRepo(){
        String fileDir = createRepo();
        if(new File(fileDir + File.separator + FileUtils.FILE_PATH).mkdirs()){
            try {
                Files.write(new File(fileDir + File.separator + FileUtils.FILE_PATH + File.separator + "prop1_no.txt").toPath(), "test data".getBytes(), CREATE_NEW);
                Files.write(new File(fileDir + File.separator + FileUtils.FILE_PATH + File.separator + "prop1_en.txt").toPath(), "test data".getBytes(), CREATE_NEW);
                Files.write(new File(fileDir + File.separator + FileUtils.FILE_PATH + File.separator + "prop2_en.txt").toPath(), "test data".getBytes(), CREATE_NEW);
                Files.write(new File(fileDir + File.separator + FileUtils.FILE_PATH + File.separator + "prop3_no.txt").toPath(), "test data".getBytes(), CREATE_NEW);
            } catch (IOException e) {
                throw new ApplikasjonsException(e);
            }
        } else {
            throw new ApplikasjonsException("Kunne ikke lage mappastruktur i testrepo");
        }
        Repository repo = GitWrapper.getLocalRepo(new File(fileDir));
        GitWrapper.commitChanges(repo, new Ident("Test", "test@test.test"), "init");
        repo.close();
        return fileDir;
    }

    public static void removeTestRepo(String localUrl) {
        try {
            org.apache.commons.io.FileUtils.deleteDirectory(new File(localUrl));
        } catch (IOException e) {
            throw new ApplikasjonsException(e);
        }
    }
}
