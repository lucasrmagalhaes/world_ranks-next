const Country = ({ country }) => {
  console.log(country);
  
  return <div>Country</div>
}

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );
  
  const country = await res.json();

  return {
    props: {
      country,
    },
  }
}