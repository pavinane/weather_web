export async function getStaticPaths() {
  // Fetch a list of all possible paths
  const paths = [
    { params: { slug: "page1" } },
    { params: { slug: "page2" } },
    // Add more paths as needed
  ];

  return {
    paths,
    fallback: false, // Set to true if you want to handle paths not defined here
  };
}

export default function Page(slug: any) {
  return <div>{slug}</div>;
}
