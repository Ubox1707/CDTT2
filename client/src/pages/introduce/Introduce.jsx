import "./introduce.css";
import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faMoneyCheckDollar,
  faFileShield,
  faCookie,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";


const Introduce = () => {
  
    const introRef = useRef(null);
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      const introElement = introRef.current;
      const handleScroll = () => {
        const introPosition = introElement.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 0.25;
    
        if (introPosition < screenPosition) {
          setShow(true);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <div>
      <Navbar />
      <Header className="header"/>
      <div className="container">
        <div className={`intro ${show ? "show" : ""}`}
      ref={introRef}>
          <div class="overlay"></div>
          <div className="content">
              <h1>Chào mừng bạn đến với Booking Hotel!!!</h1>
              <h2>Mong rằng bạn sẽ có một trải nghiệm tuyệt vời!!!</h2>
          </div> 
        </div>
        <h1 className="title"><span className="underline">Dịch Vụ</span></h1>
        <div className={`service ${show ? "show" : ""}`}
      ref={introRef}> 
            <div className="sColumn">
              <h1 className="handwriting">Dịch vụ phòng</h1>
              <p className="sContent">Chúng tôi cung cấp các loại phòng đa dạng, từ phòng tiêu chuẩn đến phòng hạng sang, đảm bảo sự thoải mái và tiện nghi cho khách hàng. 
                Bên cạnh đó là dịch vụ nhà hàng cùng các món ăn nổi tiếng mà quý khách có thể đặt hàng ở mọi nới
                Nhà hàng hàng buffet chuyên hải sản, phục vụ các món Á – Âu nổi tiếng mở ra một thế giới ẩm thực đáng trải nghiệm.
                Sự đa dạng với vô số lựa chọn ẩm thực đến từ 7 nhà bếp tương tác, phục vụ các món Pháp, Việt và Á được nhiều người yêu thích. 
                Những cuộn sushi thanh tao xếp bên cạnh các loại bánh Pháp trong một đại tiệc quốc tế, được thiết kế để lưu lại những kỉ niệm khó quên cho thực khách.
              </p>
            </div>
            <div className="sColumn">
              <h1 className="handwriting">Đặt vé</h1>
              <p className="sContent">Với đối tác hàng không và đường bay rộng rãi, chúng tôi cung cấp dịch vụ đặt vé nhanh chóng và thuận tiện để khách hàng có thể dễ dàng lựa chọn hành trình phù hợp.
                Dịch vụ đặt vé máy bay được triển khai để giúp việc đặt vé máy bay được đơn giản và dễ dàng hơn.
                Thay vì phải đợi chờ tại quầy vé cũng như xếp hàng mất thời gian, việc đặt vé trước giúp các thủ tục tại sân bay được cắt giảm đi rất nhiều và dễ dàng hơn cho cả hãng hàng không và hành khách.
              </p>
            </div>
            <div className="sColumn">
             <h1 className="handwriting">Đưa đón</h1>
             <p className="sContent">Để khách hàng có trải nghiệm du lịch thuận tiện, chúng tôi cung cấp dịch vụ đưa đón từ sân bay đến khách sạn và ngược lại, đảm bảo an toàn và tiện lợi.
              Khi du khách đặt phòng khách sạn, ngoài việc chọn ra căn phòng ưng ý. Thì một số tiện ích đi kèm cũng là yếu tố đáng để bạn quan tâm. 
              Một trong những tiện ích phải kể đến là dịch vụ đưa đón sân bay. 
              Thông thường để tạo điều kiện cho du khách thuận tiện trong việc đi lại. 
              Các khách sạn sẽ thiết lập một dịch vụ đưa đón sân bay hoàn chỉnh để phục vụ khách hàng của mình. 
              Dịch vụ này có thể phát sinh phí phụ thu hoặc được bao gồm trong tiền phòng của bạn tùy thuộc vào chính sách khách sạn.
             </p>
            </div>  
        </div>
        <h1 className="title"><span className="underline">Thành Viên</span></h1>
        <div className="member">
          <div className="mPic">
            <a className="mLink" href="https://www.facebook.com/quocvuong.ha.792">
            <img className="mAvatar" src={require('./img/vuong.png')} alt="member1" />
            <h3 className="mName">Hà Quốc Vương</h3>
            </a>
            
          </div>
          <div className="mPic">
            <a className="mLink" href="https://www.facebook.com/ngocnho.nt.12">
            <img className="mAvatar" src={require('./img/nho.png')} alt="member1" />
            <h3 className="mName">Nguyễn Ngọc Nhớ</h3>
            </a>
            
          </div>
          <div className="mPic">
            <a className="mLink" href="https://www.facebook.com/sara.ki.792">
            <img className="mAvatar" src={require('./img/huu.png')} alt="member1" />
            <h3 className="mName">Hoàng Chiến Hữu</h3>
            </a>
            
          </div>
          <div className="mPic">
            <a className="mLink" href="https://www.facebook.com/profile.php?id=100064592705069">
            <img className="mAvatar" src={require('./img/thinh.png')} alt="member1" />
            <h3 className="mName">Nguyễn Quốc Thịnh</h3>
            </a>
            
          </div>
         
        </div>
        <h1 className="title"><span className="underline">Tính Năng</span></h1>
        <div className="feature">
          <div className="fColumn">
            <h1 className="fTitle">Hotel Booking cung cấp cho khách hàng các tính năng tối ưu</h1>
            <p>Hiển thị danh sách khách sạn cùng với thông tin chi tiết cũng như giá phòng.</p>
            <p>Chức năng book phòng thuận lợi ngay trên giao diện website giúp khách hàng thao tác dễ dàng</p>
            <p>Cập nhật thông tin về các sự kiện, khuyến mãi, và các điểm du lịch gần khách sạn</p>
            <p>Cung cấp thông tin liên hệ để khách hàng có thể liên hệ khi cần hỗ trợ</p>
          </div>

        </div>
        <h1 className="title"><span className="underline">Chính Sách</span></h1>
        <div className={`policy ${show ? "show" : ""}`}
      ref={introRef}>
          <div className="pColumn">
          <FontAwesomeIcon icon={faLock} style={{ color: "#A91D3A", fontSize:"30px" }} />
              <h2 className="handwriting">Bảo mật</h2>
              <p className="sContent">Cam kết bảo vệ thông tin cá nhân của bạn. </p>
              <p className="sContent">Chính sách bảo mật của chúng tôi mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn. </p>
              <p className="sContent">Đọc kỹ chính sách bảo mật để hiểu rõ cách chúng tôi xử lý thông tin cá nhân của bạn. </p>
          </div>
          <div className="pColumn">
          <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: "#A0DEFF", fontSize:"30px" }} />
              <h2 className="handwriting">Thanh toán</h2>
              <p className="sContent">Xác định các phương thức thanh toán được chấp nhận và quy trình xử lý thanh toán. Nó cung cấp thông tin về bảo mật thanh toán và xử lý giao dịch.
              <p className="sContent">Vui lòng đọc kỹ chính sách thanh toán để hiểu rõ các quy định liên quan đến thanh toán và xử lý giao dịch.</p> 
              </p>
          </div>
          <div className="pColumn">
          <FontAwesomeIcon icon={faFileShield} style={{ color: "#A91D3A", fontSize:"30px" }} />
              <h2 className="handwriting">Bảo mật thông tin</h2>
              <p className="sContent">Cam kết bảo vệ thông tin cá nhân của bạn và chỉ sử dụng nó trong phạm vi cần thiết để cung cấp dịch vụ cho bạn.</p>
              <p className="sContent">Chính sách bảo mật thông tin cá nhân mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng.
                Đọc kỹ chính sách này để hiểu cách chúng tôi xử lý thông tin cá nhân của bạn.</p> 
          </div>
          <div className="pColumn">
          <FontAwesomeIcon icon={faCookie} style={{ color: "#A0DEFF", fontSize:"30px" }} />
              <h2 className="handwriting">Cookie</h2>
              <p className="sContent">Sử dụng cookie và công nghệ tương tự để cung cấp trải nghiệm tốt nhất cho bạn.</p>
              <p className="sContent">Chính sách sử dụng cookie mô tả cách chúng tôi sử dụng cookie và công nghệ tương tự, cũng như cách bạn có thể quản lý và kiểm soát việc sử dụng cookie trên trình duyệt của bạn.</p> 
          </div>
        </div>
        <h1 className="title"><span className="underline">Liên lạc</span></h1>
        <div className="contact">
          <div className="cColumn">
              <h1>Dễ dàng liên hệ với chúng tôi qua các nền tảng khác nhau!</h1>
              <div className="cContent">
                <a className="link" href="tel: 0376928646">
                  <FontAwesomeIcon className="icon" icon={faPhone} style={{ color: "#000", fontSize:"30px" }} />
                  0376922412</a>
              </div>
              <div className="cContent">
                <a className="link" href="https://www.facebook.com/profile.php?id=100064592705069">
                <FontAwesomeIcon className="icon" icon={faFacebook} style={{ color: "2C4E80", fontSize:"30px" }} />
                Facebook</a>
              </div>
              <div className="cContent">
                <a className="link" href="mailto:2151120050@ut.edu.vn">
                <FontAwesomeIcon className="icon" icon={faEnvelope} style={{ color: "FC4100", fontSize:"30px" }} />
                2151120050@ut.edu.vn</a>
              </div>
          </div>
        </div>
        <div className="outtro">
          <div class="overlayo"></div>
            <div className="oContent">
              <h1>Cảm ơn bạn đã đến với Booking Hotel!!!</h1>
              <h2>Tạm biệt và hẹn gặp lại!!!</h2>
            </div> 
        </div>
        <div className="footer">
            <Footer/>   
        </div>
        
      </div>
    </div>
  )
}

export default Introduce
