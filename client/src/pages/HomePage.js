import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Form, Input, message, Modal, Select, DatePicker } from "antd";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const defaultMaterialFormData = {
    venderId: '',
    name: '',
    category: '',
    description: '',
    amount: '',
    orderStatus: '',
    paymentStatus: ''
  };

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allMaterials, setAllMaterails] = useState([]);
  const [editable, setEditable] = useState(null);

  //table data
  const headings = [
    {
      title: "Material Id",
    },
    {
      title: "Material Name",
    },
    {
      title: "Category",
    },
    {
      title: "Description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Purchased Date",
      dataIndex: "createdAt",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Order Status",
    },
    {
      title: "Payment Status",
      
    },
    {
      title: "Edit",

    },
    {
      title: "Delete",

    },

  ];

  useEffect(() => {
    const getAllMaterials = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.get("/materials/getAll");
        setLoading(false);
        setAllMaterails(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch all Material Details");
        setLoading(false)
      }
    };
   getAllMaterials();
  }, []);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/materials/delete-material", {
        materialId: record.materialId,
      });
      let tempData = allMaterials;
      let modifiedIndex = tempData.findIndex((material) => material.materialId == record.materialId)
      if (modifiedIndex != -1) {
        tempData.splice(modifiedIndex,1)
        setAllMaterails(tempData)
      }
      setLoading(false);
      message.success("Material Details Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete Material");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/materials/edit-material", { ...values });
        setEditable(values);
        let tempData = allMaterials;
        let modifiedIndex = tempData.findIndex((material) => material.materialId == values.materialId)
        if (modifiedIndex != -1) {
          tempData[modifiedIndex] = values;
          setAllMaterails(tempData)
        }
        setLoading(false)
        message.success("Material Updated Successfully");
      } else {
        await axios.post("/materials/add-material", {
          ...values,
        });
        setAllMaterails([...allMaterials,values]);
        setLoading(false);
        message.success("Material Added Successfully");
      }
      setShowModal(false);
      setLoading(false);
      // setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Faild to add Material detail");
    }


  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditable(null);
              setShowModal(true);
            }}
          >
            Add New Material Info
          </button>
        </div>
      </div>
      <div className="content">
        {!loading &&
        <Table striped>
          <thead>
            <tr>
              {headings.map((head, index) => (
                <th key={index}>{head.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allMaterials.map((data, index) => (
              <tr key={index}>
                <td>{data.materialId}</td>
                <td>{data.name}</td>
                <td>{data.category}</td>
                <td>{data.description}</td>
                <td>{data.amount}</td>
                <td>{moment(data.createdAt).format("YYYY-MM-DD")}</td>
                <td>{data.orderStatus}</td>
                <td>{data.paymentStatus}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditable(allMaterials[index]);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                     handleDelete(allMaterials[index])
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>}
      </div>
      <Modal
        title={editable ? "Edit Material Details" : "Add New Material Details"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form

          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Material Id" name="materialId">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Material Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="electronics">Eletronics</Select.Option>
              <Select.Option value="plumbing">Plumbing</Select.Option>
              <Select.Option value="flooring-materials">Flooring Materials</Select.Option>
              <Select.Option value="aluminuim-material">Aluminium Composite Panels</Select.Option>
              <Select.Option value="building-materials">Building Materials</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Order Status" name="orderStatus">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Payment Status" name="paymentStatus">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
