import React from 'react';
import NavbarTwo from '../components/_App/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import AboutUsContentTwo from '../components/About/AboutUsContentTwo';
import ServicesStyleTwo from '../components/Services/ServicesStyleTwo';
import OffersArea from '../components/Common/OffersArea';
import GetAFreeQuoteForm from '../components/Common/GetAFreeQuoteForm';
import Footer from '../components/_App/Footer';
import Link from 'next/link';

const BusinessInsurance = () => {
    return (
        <>
            <NavbarTwo />

            <PageBanner 
                pageTitle="Business Insurance" 
                homePageUrl="/" 
                homePageText="หน้าแรก" 
                activePageText="Business Insurance" 
            /> 

            <div className="choose-us-area choose-us-area-two pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <span>Our Features</span>
                        <h2>We are Award  Wining Company</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-3">
                            <div className="single-choose">
                                <span className="flaticon-team"></span>
                                <h3>Trustworthy Company</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                <Link href="/insurance-details">
                                    <a><i className="flaticon-right"></i></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="single-choose">
                                <span className="flaticon-money"></span>
                                <h3>Money Back Guarantee</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                <Link href="/insurance-details">
                                    <a><i className="flaticon-right"></i></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="single-choose">
                                <span className="flaticon-support"></span>
                                <h3>Awesome Support</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                <Link href="/insurance-details">
                                    <a><i className="flaticon-right"></i></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="single-choose">
                                <span className="flaticon-contract"></span>
                                <h3>Anytime Cancellation</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>

                                <Link href="/insurance-details">
                                    <a><i className="flaticon-right"></i></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AboutUsContentTwo />

            <ServicesStyleTwo />

            <OffersArea />

            <GetAFreeQuoteForm />
            
            <Footer />
        </>
    )
}

export default BusinessInsurance;