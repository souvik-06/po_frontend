import axios from 'axios';
import { useEffect } from 'react';
import config from '../../config.json';
import styles from '../DMR/DMR.module.css';

const TotalDMR = () => {
  useEffect(() => {
    let isSubscribe: boolean = true;
    const fetchAllPo = async () => {
      try {
        const response = await axios.get(`${config.SERVER_URL}getAllItems`);

        console.log(response);
      } catch (err: any) {}
    };
    if (isSubscribe) {
      fetchAllPo();
    }
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      <div className={styles.table}>
        <div className={`${styles.rowo} ${styles.header}`}>
          <div className={`${styles.cell}`}>S.No.</div>
          <div className={`${styles.cell}`}>PO Number</div>
          <div className={`${styles.cell}`}>PO Type</div>
          <div className={`${styles.cell}`}>PO Name</div>
          <div className={`${styles.cell}`}>Project Name</div>
          <div className={`${styles.cell}`}>Date</div>
          <div className={`${styles.cell}`}></div>
        </div>
      </div>
    </>
  );
};

export default TotalDMR;
