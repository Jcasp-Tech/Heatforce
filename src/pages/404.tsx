import { Col, Row } from 'antd';

const NotFound = () => {
  return (
    <Row className="sign-up sign-in" justify="center">
      <Col span={24} className="w-100">
        <div className="head-logo" />
        <div className="heading">
          <h2>404!</h2>
          <p>Not Found</p>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
