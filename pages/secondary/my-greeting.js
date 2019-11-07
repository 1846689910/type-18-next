import Router, { useRouter } from "next/router";

const MyGreeting = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() =>
          Router.push({
            pathname: "/"
          })
        }
      >
        go to index page
      </button>
      <p>I am a secondary page with pathname {router.pathname}</p>
    </div>
  );
};
export default MyGreeting;
