import React ,{useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography ;
const { Option } = Select;

const News = ({ simplified }) => {

  const [newsCategory , setNewsCategory ] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);

const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 9 : 40 });

 console.log(cryptoNews)
 const demoimage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

if(!cryptoNews?.value) return <Loader />;
  return (
    <div>
      {simplified ? (
          <div className='home-heading-container' >
          <Title level={2} style={{fontFamily:'sans-serif', color: 'grey' , fontWeight: 100, letterSpacing: '0.2rem'}}>Latest Crypto News </Title>
          <Title level={4} hoverable><Link to='/news' style={{color:'#000'}}>Show more</Link></Title>
       </div>
      ): (
        <Title level={2} style={{fontFamily:'sans-serif', color: 'grey' , fontWeight: 100, letterSpacing: '0.2rem'}}>Latest Crypto News </Title>
      )
      }
  
    <Row gutter={[24, 24]}>

      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.childern.toLowerCase().indexOf(input.toLowerCase()) > 0 }
          >
           <Option value='Cryptocurrency'>Cryptocurrency</Option>
           {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option> )}
 
          </Select>
        </Col>
      )

      }

      {cryptoNews.value.map(( news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
             <a href={news.url} target='_blank' rel='noreferrer'>
               <div className='news-image-container'>
                 <Title className='news-title' level={4}>
                    {news.name}
                 </Title>
                 <img  style={{maxHeight:'100px',maxWidth:'200px'}} src={news?.image?.thumbnail?.contentUrl || demoimage} alt='news'/>
               </div>
               <p>
                 {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description
                }
               </p>
               <div className='provider-container'>
                 <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoimage} alt=''/>
                  <Text>{news.provider[0]?.name}</Text>
                 </div>
                 <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
               </div>
             </a>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default News