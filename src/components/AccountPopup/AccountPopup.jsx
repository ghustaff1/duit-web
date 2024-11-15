import React from 'react'
import styles from './AccountPopup.module.scss';

const closeSvg = (<svg
  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
</svg>)

const AccountPopup = ({ userStatus, setUserStatus }) => {

  const [type, setType] = React.useState('login');

  console.log('userStatus', userStatus)


  return (
    <div className={userStatus === 'authenticating' ?
      styles.popupEnabled : styles.popupDisabled}>
      {type === 'login' ?
      //registration form
        <form className={styles.form}>
          <div className={styles.formTop}>
            <h2 className={styles.formTitle}>Login to your account</h2>
            <span
              className='cursor-pointer'
              onClick={() => setUserStatus('')}>
              {closeSvg}
            </span>
          </div>
          <div className={styles.formBody}>
            <label className={styles.formLabel} htmlFor="login">E-mail</label>
            <input className={styles.formInput} type="text" placeholder='Enter login' name="login" required />
            <label className={styles.formLabel} htmlFor="password">Password</label>
            <input className={styles.formInput} type="text" placeholder='Enter password' name="password" required />
            <button className={styles.submitBtn} type="submit" >Login</button>
          </div>
          <div className='text-sm'>
            <span>Don't have an account? </span>
            <span className='text-green1 cursor-pointer'
              onClick={() => setType('registration')}
            >Register here</span>
          </div>


        </form> :
        //login form
        <form className={styles.form}>
          <div className={styles.formTop}>
            <h2 className={styles.formTitle}>Register an account</h2>
            <span
              className='cursor-pointer'
              onClick={() => setUserStatus('')}>
              {closeSvg}
            </span>
          </div>
          <div className={styles.formBody}>
            <label className={styles.formLabel} htmlFor="name">Name</label>
            <input className={styles.formInput} type="text" placeholder='Enter your name' name="login" required />
            <label className={styles.formLabel} htmlFor="login">Surname</label>
            <input className={styles.formInput} type="text" placeholder='Enter your surname' name="login" required />
            <label className={styles.formLabel} htmlFor="login">E-mail</label>
            <input className={styles.formInput} type="text" placeholder='Enter your e-mail' name="login" required />
            <label className={styles.formLabel} htmlFor="password">Password</label>
            <input className={styles.formInput} type="text" placeholder='Create a password' name="password" required />
            <button className={styles.submitBtn} type="submit">Register</button>
          </div>
          <div className='text-sm'>
            <span>Already have an account? </span>
            <span className='text-green1 cursor-pointer'
              onClick={() => setType('login')}
            >Login here</span>
          </div>


        </form>
      }
    </div>
  )
}

export default AccountPopup;