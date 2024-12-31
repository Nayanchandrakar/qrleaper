import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"

export async function deleteFile(fileKey: string) {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
      })
    )
    console.log("Deleted Succefully", fileKey)
  } catch (error) {
    console.error("Error deleting file from S3:", error)
  }
}
