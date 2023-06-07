import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage';
import LogoBig from '../components/LogoBig';
import register from '../assets/images/register.jpg';
import choose from '../assets/images/choose.jpg';
import sell from '../assets/images/sell.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'


const LandingPage = () => {
  const navigate = useNavigate();
  const btnHandler = () => {
    navigate('catalog');
  }

  return (
   <Wrapper>
      <section className='container page'>
        <div>
          <h1>CONNECTIFY</h1>
          <p> Connectify is a smart and intuitive marketplace app that connects buyers, sellers, and suppliers, enabling them to form valuable connections and secure lucrative deals. With its user-friendly interface and powerful features, Connectify revolutionizes the way individuals buy and sell products.</p>
        </div>
          <LogoBig/>
      </section>
      <section className='how-container'>
        <h1>HOW IT WORKS</h1>
        <h2>JUMPSTART YOUR ONLINE BUSINESS WITH CONNECTIFY</h2>
        <div className='image-container'>
          <div>
            <img src={register} alt='register' className='pic' />
            <h3 className='text'>REGISTER</h3>
          </div>
          <div>
            <img src={choose} alt='choose' className='pic' />
            <h3 className='text'>CHOOSE CATALOG</h3>
          </div>
          <div>
            <img src={sell} alt='sell' className='pic' />
            <h3 className='text'>START SELLING</h3>
          </div>
        </div>
        <button className='btn' onClick={btnHandler}>Subscribe</button>
      </section>
      <section className='why-container'>
        <h1>WHY CHOOSE CONNECTIFY</h1>
        <h2>Key Features</h2>
        <ul>
          <li><p><strong>Seamless Connectivity</strong> <br></br> Connectify provides a seamless and intuitive platform that connects buyers, sellers, and suppliers, enabling efficient and transparent transactions.</p></li>
          <li><p><strong>Verified Suppliers</strong><br></br> Connectify ensures that suppliers on the platform are verified, establishing trust and reliability in the sourcing process for sellers, who gain access to a network of reputable suppliers.</p></li>
          <li><p><strong>Streamlined Selling</strong><br></br> Sellers can easily list their products, manage inventory, and track sales within the app, streamlining their selling process and enhancing their business efficiency.</p></li>
          <li><p><strong>Secure Transactions</strong><br></br> Connectify prioritizes the security of transactions, implementing robust measures to safeguard sensitive information and facilitate secure payment options for buyers and sellers.</p></li>
          <li><p><strong>Pricing Flexibility</strong><br></br> Connectify offers flexible pricing plans for sellers and suppliers, allowing them to choose the options that best suit their business needs and goals.</p></li>
          <li><p><strong>Analytics and Insights</strong><br></br> The app provides sellers and suppliers with valuable analytics and insights, offering data on sales trends, customer behavior, and performance metrics, enabling informed business decisions.</p></li>
          <li><p><strong>User-Friendly Interface</strong><br></br> Connectify features a user-friendly interface with intuitive navigation and clear design, ensuring a seamless and enjoyable experience for all users</p></li>
        </ul>
      </section>
      <section className='brand-container'>
        <h1>Our Brand Partners</h1>
      </section>
      <Footer />
    </Wrapper>
  )
}

export default LandingPage;