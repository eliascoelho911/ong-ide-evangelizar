import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function uploadStudentFile(
  studentId: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `students/${studentId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress(progress); // Atualiza o progresso
      },
      (error) => {
        reject(error); // Erro durante o upload
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // Upload concluído, retorna a URL
        } catch (error) {
          reject(error); // Erro ao obter a URL
        }
      }
    );
  });
}

export async function getStudentFileUrl(studentId: string, fileName: string): Promise<string> {
  const storageRef = ref(storage, `students/${studentId}/${fileName}`);
  return getDownloadURL(storageRef);
}