import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { API_URL } from '../config'

export default function App() {
  const [rollNumbers, setRollNumbers] = useState([])
  const [results, setResults] = useState([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // make an array of rollNumbers out of comma separated string input
    let arr = userInput.trim().split(',')
    setRollNumbers(arr)
    setLoading(true)
    // Making a post request to the API
    const result = await axios.post(
      `${API_URL}/fetchResult`,
      {
        rollNumbers: arr,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    setLoading(false)
    setResults(result.data)
  }
  return (
    <div className={styles.App}>
      <h1>Terribly Tiny Tales</h1>
      <p>
        {' '}
        <i> the world's most celebrated micro-fiction platform </i>
      </p>
      <div className={styles.input_wrapper}>
        <input
          onChange={(e) => setUserInput(e.target.value)}
          type='text'
          value={userInput}
          className={styles.user_input}
        />
      </div>
      <br />
      <button
        onClick={handleSubmit}
        type='submit'
        className={styles.submit_btn}
      >
        {loading ? (
          <img
            src='/assets/spinner.gif'
            alt='Loading...'
            height='35'
            width='35'
          />
        ) : (
          'Submit'
        )}
      </button>

      <table className={styles.result_table}>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {!loading
            ? results.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.rollNumber}</td>
                    <td
                      className={
                        item.result == 'Fail' ? styles.fail : styles.pass
                      }
                    >
                      {item.result}
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>

      <ul className={styles.boxes}>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
        <li className={styles.box}></li>
      </ul>
    </div>
  )
}
