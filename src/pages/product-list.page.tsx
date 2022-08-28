/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'components';
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import { columnProduct, getProduct, postProduct } from 'shared';
import { objCategory, objData } from 'shared/api/mock-data';

const ProductListPage = () => {
  const [data, setData] = useState<any>(objData);
  const [show, setShow] = useState<any>(false);
  const [value, setValue] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState<any>(false);
  const navigate = useNavigate();
  const addAction = {
    name: "Action",
    cell: (row: any) => (
      <>
        <Button mode="tertiary" onClick={() => handleClick(row)}>Detail</Button>
      </>
    ),
    sortable: true,
    center: true,
  }
  let tempColumn = [addAction, ...columnProduct];

  const fetchProduct = async () => {
    const res = await getProduct();
    setData([...res?.data, ...objData]);
    setIsSubmit(false);
  }

  useEffect(() => {
    fetchProduct();
    localStorage.setItem("P-DATA", btoa(JSON.stringify(data)));
  }, [isSubmit]);

  const handleClick = (data: any) => {
    localStorage.setItem("S-DATA", btoa(JSON.stringify(data)));
    navigate('/Product-detail');
  }

  const handleInput = (e: any) => {
    const name = e.target.name;
    const val = e.target.value;
    setValue({ ...value, [name]: val });
  }

  const handleSubmit = async (e: any) => {
    setIsSubmit(true);
    e.preventDefault();
    e.persist()
    console.log(value);
    const categoryName = objCategory.find((e: any) => e?.value.includes(value?.categoryId))?.label;
    console.log(categoryName);
    const obj = {
      ...value,
      categoryName
    }
    const res = await postProduct(obj);
    console.log(res);
    setShow(!show);
  }

  return (
    <div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Product</h1>
          <div>
            <Button mode="primary" onClick={() => setShow(!show)}>Add Product</Button>
          </div>
        </div>
        <DataTable
          columns={tempColumn}
          data={data}
        />
      </Card>
      <Modal show={show} onHide={() => setShow(!show)} centered>
        <Form onSubmit={(e: any) => handleSubmit(e)}>
          <Modal.Header>Add Product</Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name="f_name" type="text" placeholder="Enter Name" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="my_multiselect_field">
              <Form.Label>Category</Form.Label>
              <Form.Select name="categoryId" onChange={(e: any) => handleInput(e)}>
                <option disabled>Select Category</option>
                {objCategory?.map((data: any, i: number) => (
                  <option key={i} value={data?.value}>{data?.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>SKU</Form.Label>
              <Form.Control name="sku" type="text" placeholder="Enter SKU" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" aria-label="With textarea" placeholder="Enter Description" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Width</Form.Label>
              <Form.Control name="width" type="number" placeholder="Enter Width" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Weight</Form.Label>
              <Form.Control name="weight" type="number" placeholder="Enter Weight" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Height</Form.Label>
              <Form.Control name="height" type="number" placeholder="Enter Height" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Length</Form.Label>
              <Form.Control name="length" type="number" placeholder="Enter Length" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control name="image" type="file" placeholder="Enter " onChange={(e: any) => handleInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Harga</Form.Label>
              <Form.Control name="harga" type="number" placeholder="Enter Harga" onChange={(e: any) => handleInput(e)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button mode="primary" type="submit">Submit</Button>
            <Button mode="danger" onClick={() => setShow(!show)}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductListPage