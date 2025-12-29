// pages/index.js
export default function Home() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.writeHead(307, { Location: '/api/frame' });
  res.end();
  return { props: {} };
}
