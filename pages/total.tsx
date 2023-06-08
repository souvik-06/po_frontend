import 'bootstrap/dist/css/bootstrap.min.css';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';
import TotalDMR from '../components/TotalDMR/totalAmount';

const Total: NextPageWithLayout = () => {
  return <><TotalDMR></TotalDMR></>;
};

export default Total;

Total.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
