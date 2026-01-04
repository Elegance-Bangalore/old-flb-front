import NotFound from "@/components/404";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Farmland Bazaar',
  description:
    'Farmland Bazaar',
}

const NotFoundPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
