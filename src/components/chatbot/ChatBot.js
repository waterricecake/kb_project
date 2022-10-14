import React from "react";
import $ from "jquery";
import "./ChatBot.scss";
import { Image } from "react-bootstrap";

class ChatBot extends React.Component {
  componentDidMount() {
    $(function () {
      setTimeout(function () {
        $(".tip").html(
          "<div id='select'> <p>어떤 서비스를 이용하시겠어요?</p><br><button>음성서비스</button><button>핸즈프리 서비스</button><button>서비스 필요없음</button> </div>"
        );
      }, 5000);

      $(".tip").on("click", "button", selectBtn);
    });
    function selectBtn() {
      $(this).css("background", "rgb(241, 196, 15)");
    }

    // Jquery here $(...)...
  }
  render() {
    return (
      <div className="ChatBot">
        <div id="chatbot">
          <div className="tip">무엇을 도와드릴까요?</div>
          <div className="icon">
            <Image
              src="image/깨비.png"
              style={{ width: "150px", height: "180px" }}
              className="img1"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBot;
