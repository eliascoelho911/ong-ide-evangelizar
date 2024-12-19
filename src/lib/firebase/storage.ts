import { ref, uploadBytesResumable, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { storage } from "./config";

async function fileExists(storageRef: any): Promise<boolean> {
  try {
    await getDownloadURL(storageRef);
    return true;
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      return false;
    }
    throw error; 
  }
}

export async function uploadStudentFile(
  studentId: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, `students/${studentId}/${file.name}`);

  const exists = await fileExists(storageRef);

  if (exists) {
    const existingFileMetadata = await getMetadata(storageRef);

    if (existingFileMetadata.size === file.size) {
      const existingFileURL = await getDownloadURL(storageRef);
      console.log("Arquivo já existe e é idêntico. Retornando URL.");
      return existingFileURL;
    }
  }

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); 
        } catch (error) {
          reject(error); 
        }
      }
    );
  });
}

export async function removeStudentFile(studentId: string, fileName: string): Promise<void> {
  console.log(`Removendo arquivo ${fileName} para o estudante ${studentId}.`);
  const storageRef = ref(storage, `students/${studentId}/${fileName}`);

  try {
    await deleteObject(storageRef);
    console.log(`Arquivo ${fileName} removido com sucesso para o estudante ${studentId}.`);
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      console.error("Arquivo não encontrado no Firebase Storage.");
    } else {
      console.error("Erro ao tentar remover o arquivo:", error);
      throw error; // Lança o erro para ser tratado externamente
    }
  }
}

export async function getStudentFileUrl(studentId: string, fileName: string): Promise<string> {
  const storageRef = ref(storage, `students/${studentId}/${fileName}`);
  return getDownloadURL(storageRef);
}