export interface FileSystemItem {
    name: string;
    type: "folder" | "file";
    children?: FileSystemItem[];
    onClick?: (event: MouseEvent) => void;
}