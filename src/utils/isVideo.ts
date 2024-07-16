export default function isVideoExtension(media: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    const fileExtension = media.slice(media.lastIndexOf('.'));
    const result = videoExtensions.includes(fileExtension);
    return result;
}
