import { useState } from 'react';

import { CountriesTable } from '../components/CountriesTable';
import { Layout } from '../components/Layout'
import { SearchInput } from '../components/SearchInput'

import styles from '../styles/Home.module.css'

export default function Home({ countries }) {
  console.log(countries);

  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }
  
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        
        <div className={styles.input}>
          <SearchInput 
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange} 
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    }
  }
}