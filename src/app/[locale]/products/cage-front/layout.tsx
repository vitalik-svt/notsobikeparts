import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`cage-front`);

export { generateMetadata };
export default Layout;
