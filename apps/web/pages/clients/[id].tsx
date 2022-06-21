import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const { NEXT_PUBLIC_HOST } = process.env;

function ClientById({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div>
        {/* <pre>{res}</pre> */}
        <div>client by id {id}</div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query.id;

  if (!id) {
    return { notFound: true };
  }

  const res = await fetch(`${NEXT_PUBLIC_HOST}/api/clients/${id}`);

  console.log(await res.json());

  return {
    props: {
      id,
    },
  };
};

export default ClientById;
