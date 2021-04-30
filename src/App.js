  
import React, { useState, useEffect} from 'react';
import { Box, Container, Button } from '@material-ui/core';
import { CSVReader } from 'react-papaparse'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CsvToHtmlTable } from 'react-csv-to-table';

// import CSVReader from 'react-csv-reader'
import './App.css';

const App = () => {

    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState(null);
    const [product, setProduct] = useState(null);
    const [targetProduct, setTargetProduct] = useState(null);
    const [targetCountry, setTargetCountry] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
      if(country !== null && product !== null) {
        setShow(true);
        console.log(product);
      }
    }, [country, product])  


    
    useEffect(() => {
      if(targetCountry !== null && targetProduct !== null) {
        // create table data 
        let tData = "";
        tData += data[0].data.join(", ");
        tData += "\n"
        for (let i = 1; i < data.length; i++) {
          if (data[i].data[1] === targetCountry && data[i].data[2] === targetProduct) {
              tData += data[i].data.join(", ");
              tData += "\n"
          }
        }
        console.log(tData);
        setTableData(tData);
        console.log(tableData);
      } else {
        setShowTable(false);
        setTableData(null);
      }
    }, [targetCountry, targetProduct])  


    useEffect(() => {
      if (tableData !== null) {
        setShowTable(true);
        console.log(showTable);
      }
    }, [tableData])  

    const handleOnDrop = (data) => {
        console.log(data[1]);
        setData(data);
    }
    
    const handleOnError = () => {
      alert("on drop error");
    }


    const clearUp = () => {
      setProduct(null);
      setCountry(null);
      setShow(false);
      setTargetCountry(null);
      setData(null);
      setTargetProduct(null);
      setShowTable(false);
      setTableData(null);
    }

    const process = () => {
      if (data === null) {
        alert("you have not input any file")
        return
      }

      // set country and product 
      var countryList = [];
      var productList = [];

      for (let i = 1; i < data.length; i++) {
        if (!countryList.includes(data[i].data[1])) {
          countryList.push(data[i].data[1]);
        }
        if (!productList.includes(data[i].data[2])) {
          productList.push(data[i].data[2]);
        }
      }
      setCountry(countryList.sort());
      setProduct(productList.sort());
    }
    return (

        <Box className="main-body">
            <Box>
                <Container style={{ height: "100vh", width: "50%", paddingTop: "80px" }}>

                    {!show ? 
                    <Container id="drop-box">
                        <Container style={{ height: "200px", width: "70%", fontFamily: "fa5-proxima-nova", fontSize: "19px", color: "#495057" }}>
                          <CSVReader
                            onDrop={handleOnDrop}
                            onError={handleOnError}
                            noClick
                            addRemoveButton
                            onRemoveFile={ () => {setData(null)}}
                          >
                            <span>Drop CSV file here to upload.</span>
                          </CSVReader>
                        
                        </Container>
                    </Container>
                    : 
                    <Container id="drop-box" style={{paddingLeft:"50px"}}>
                        <FormControl style={{marginLeft:"150px", marginRight:"50px", width:"100px"}}>
                          <InputLabel id="input">Country</InputLabel>
                          <Select
                            labelId="open-select-label"
                            id="open-select"
                            onChange = {(e) => {setTargetCountry(e.target.value)}}
                          >
                            <MenuItem value={null}>
                              <em>None</em>
                            </MenuItem>
                            {country.map((tmp) => (       
                                <MenuItem value={tmp}>{tmp}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                         <FormControl style={{marginLeft:"10px", width:"100px"}}>
                          <InputLabel id="input">Product</InputLabel>
                          <Select
                            labelId="open-select-label"
                            id="open-select"
                            onChange = {(e) => {setTargetProduct(e.target.value)}}
                          >
                            <MenuItem value={null}>
                              <em>None</em>
                            </MenuItem>
                            {product.map((tmp) => (       
                                <MenuItem value={tmp}>{tmp}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    </Container>
                    }
                    {!show ? 
                    <Container style={{ height: "25vh", width: "15%", borderRadius: "25px", paddingTop: "20px" }}>
                        <Button onClick={process} variant="contained" color="primary"
                           style={{ backgroundColor: '#9575cd' }}>Process</Button>
                    </Container>
                    :
                    <Container style={{ height: "25vh", width: "15%", borderRadius: "25px", paddingTop: "20px" }}>
                        <Button onClick={clearUp} variant="contained" color="primary"
                           style={{ backgroundColor: '#9575cd' }}>Reset</Button>
                    </Container>
                    
                    }
                    {showTable && 
                    <CsvToHtmlTable
                        data={tableData}
                        csvDelimiter=","
                        tableClassName="table table-striped table-hover"
                    />
                    }
                </Container>
            </Box>
        </Box>
    );

}

export default App;
