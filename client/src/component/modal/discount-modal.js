import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";


export function DiscountModal(props) {
  const { show, handleClose, discountData } = props;
  const { register, handleSubmit } = useForm();
  // 
  const onSubmitForm = (data) => {
    alert(JSON.stringify(data));
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="discount-form" onSubmit={handleSubmit(onSubmitForm)}>
            {/*  */}
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={discountData[0].id}
                defaultValue={discountData[0].id ?? "none"}
                {...register("id")}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>割引コード</Form.Label>
              <Form.Control
                type="text"
                placeholder={discountData[0].code}
                defaultValue={discountData[0].code ?? "none"}
                {...register("code")}
              />
            </Form.Group>
          </Form>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>コード数</Form.Label>
            <Form.Control
              type="text"
              placeholder={discountData[0].amount}
              defaultValue={discountData[0].amount ?? "none"}
              {...register("amount")}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>割引額</Form.Label>
            <Form.Control
              type="text"
              placeholder={discountData[0].percent}
              defaultValue={discountData[0].percent ?? "none"}
              {...register("percent")}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>最小額</Form.Label>
            <Form.Control
              type="text"
              placeholder={discountData[0].min_percent}
              defaultValue={discountData[0].min_percent ?? "none"}
              {...register("min_percent")}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>開始時間</Form.Label>
            <Form.Control
              type="text"
              placeholder={discountData[0].create_date}
              defaultValue={discountData[0].create_date ?? "none"}
              {...register("create_date")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleClose}
            form="discount-form"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
