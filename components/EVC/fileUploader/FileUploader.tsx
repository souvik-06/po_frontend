import { faDownload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  Alert,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { read, utils } from 'xlsx';
import config from '../../../config.json';
import { IFileUploader } from '../../../interface';

const FileUploader = ({
  fileError,
  setData,
  setWorkbook,
  setFileError,
  inputFileRef,
  handleRemoveFile,
  setSheetName,
  sheetName,
  setHeader,
  projectNames,
  setNewEVCreate,
}: IFileUploader) => {
  const api = axios.create({
    baseURL: config.SERVER_URL,
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      // Add headers or authentication tokens to the request config
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  const downloadExcel = (e: any) => {
    const xlsx = require('xlsx');
    const id = toast.loading('Preparing to download.', {
      position: 'bottom-right',
      autoClose: 2000, // Set a duration in milliseconds (e.g., 2000 for 2 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    let data: string = projectNames[e];
    // axios
    //   .get(`${config.SERVER_URL}xlData/${data}`)
    //   .then((d) => {
    //     console.log(d);
    //     const workbook = d.data;
    //     writeFile(workbook, `${data}.xlsx`);
    //     toast.update(id, {
    //       render: 'File Downloaded.',
    //       type: 'success',
    //       isLoading: false,
    //       autoClose: 300,
    //     });
    //   })
    api
      .get(`${config.SERVER_URL}xlData/${data}`, {
        responseType: 'json',
      })
      .then((response) => {
        console.log(response);
        // const blob = new Blob([response.data], {
        //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', `${data}.xlsx`);
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    setFileError('');
    try {
      let file: File | null = e.target.files[0];

      if (!file) {
        return;
      }
      console.log(file.type);
      if (
        file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        toast.error('Please select XLSX file only!');
        handleRemoveFile();
      } else {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const workbook = read(event.target.result, {
            type: 'binary',
            cellFormula: true,
          });
          setWorkbook(workbook);
          setSheetName(workbook.SheetNames);
          const selectedWorksheet = workbook.Sheets[workbook.SheetNames[0]];
          const sheetData1: Array<string[]> = utils.sheet_to_json(
            selectedWorksheet,
            {
              header: 1,
              raw: false,
              dateNF: 'yyyy-mm-dd',
              // cellDates: true,
            }
          );
          const sheetData = utils.sheet_to_json(selectedWorksheet, {
            raw: false,
            dateNF: 'yyyy-mm-dd',
            // cellDates: true,
          });
          setHeader(sheetData1[0]);

          // Modify sheet data
          const modifiedSheetData = sheetData.map((row, index) => {
            if (index === 1) {
              return Array.isArray(row)
                ? row.map((cell) => (cell == null || cell === '' ? 0 : cell))
                : row;
            }
            return row;
          });
          setData(modifiedSheetData as string[]);

          console.log(modifiedSheetData, 'sheetdata');
        };
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      setFileError('Error reading file. Please select a valid Excel file.');
    }
  };

  return (
    <>
      <div className="d-flex">
        <DropdownButton
          className="my-3"
          variant="outline-dark"
          title={
            <i>
              Download Project data
              <FontAwesomeIcon
                icon={faDownload}
                className="mx-2"
                style={{ color: '#000000' }}
              />
            </i>
          }
          onSelect={downloadExcel}
        >
          {projectNames.map((projectSelect: string, index: number) => (
            <Dropdown.Item key={index} eventKey={index}>
              {projectSelect}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <span className="mx-3" />
        <Button
          variant="outline-primary"
          className="my-3"
          onClick={() => setNewEVCreate(true)}
        >
          Add New Project
        </Button>
      </div>
      <Form>
        <Card className="text-center files">
          <Card.Header>Upload Excel file</Card.Header>
          <Card.Body>
            <Card.Text>
              <input
                placeholder="Select File.."
                title="file"
                type="file"
                name="file"
                onChange={handleFileUpload}
                ref={inputFileRef}
                accept=".xlsx"
                required
              />
              {sheetName?.length > 0 ? (
                <i className="fa fa-close" onClick={handleRemoveFile}>
                  {' '}
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: '#000000' }}
                  />
                </i>
              ) : null}
            </Card.Text>
            {fileError ? <Alert variant="danger">{fileError}</Alert> : null}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default FileUploader;
