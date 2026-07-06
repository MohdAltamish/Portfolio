/// <reference types="vite/client" />

declare module "*.pdf?url" {
  const content: string;
  export default content;
}
