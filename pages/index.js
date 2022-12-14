import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { Button, notification, Row, Col, box, Form, Input } from 'antd';
import axios from "axios";
import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState()

  const onFinish = async (values) => {
    console.log("values", values);
    try {
      const response = await axios.post('https://live-api.employeebuddy.xyz/accounts/v1/auth/login', values);
      console.log(response?.data.data.token);
      if (response) {
        setToken(response?.data.data.token);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const punchIn = async () => {
    // latitude: 23.7508483
    // longitude: 90.4031033

    try {
      let data = {
        lat_long: `${23.7508483}, ${90.4031033}`,
        type: 2, // single punch type as described above
        device: 'mobile-or-tab',
        isEmulator: false
      };
      
      let res = await axios({
        method: 'post',
        url: "https://live-api.employeebuddy.xyz/accounts/v1/hris/emp-attendance",
        headers: {
          'Authorization': `bearer ${token}`
        },
        data: data
      })

      if (res) {
        notification['success']({
          message: 'Live',
          description:
            'Punch in from live successfully',
        });
      } else {
        notification['error']({
          message: 'Notification Title',
          description:
            'Not Allow',
        });

      }

    } catch (error) {
      notification['error']({
        message: 'Notification Title',
        description:
          'Not Allow',
      });
    }
  }

  const punchInPilot = async () => {
    try {
      let data = {
        lat_long: `${23.7508483}, ${90.4031033}`,
        type: 2, // single punch type as described above
        device: 'mobile-or-tab',
        isEmulator: false
      };
      
      let res = await axios({
        method: 'post',
        url: "https://pilot-apigw.employeebuddy.xyz/accounts/v1/hris/emp-attendance",
        headers: {
          'Authorization': `bearer ${token}`
        },
        data: data
      })

      if (res) {
        notification['success']({
          message: 'Pilot Panch in',
          description:
            'Punch in from pilot successfully',
        });
      } else {
        notification['error']({
          message: 'Error',
          description:
            'Not Allow',
        });

      }

    } catch (error) {
      notification['error']({
        message: 'Error',
        description:
          'Not Allow.',
      });
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Row>
        <Col span={12} offset={6}>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Employee Id"
              name="emp_id"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>

          {token ? <>
            <Button type="primary" style={{ marginRight: "1rem" }} size="large" onClick={() => punchIn()}>Punch</Button>
            <Button type="primary" className='mr-3' size="large" onClick={() => punchInPilot()}>Punch Pilot</Button>
          </>  : ''}
        </Col>
      </Row>


      <footer className={styles.footer}>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
