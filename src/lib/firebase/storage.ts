import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

export async function uploadStudentFile(
  studentId: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, `students/${studentId}/${file.name}`);

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

export async function deleteStudentFile(studentId: string, fileName: string): Promise<void> {
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