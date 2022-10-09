import React, { useState } from "react";
import "./MapList.scss";

const { kakao } = window;

function MapList({ searchPlace }) {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);
  // 장소 검색 객체를 생성
  const ps = new kakao.maps.services.Places();
  // 키워드로 장소를 검색
  ps.keywordSearch(searchPlace, placesSearchCB);

  function placesSearchCB(data, status, pagination) {
    // 페이지 목록 보여주는 displayPagination() 추가
    displayPagination(pagination);
    setPlaces(data);
  }
  // 검색결과 목록 하단에 페이지 번호 표시
  function displayPagination(pagination) {
    var paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지 번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  return (
    <div id="result-list">
      {Places.map((item, i) => (
        <div key={i} style={{ marginTop: "20px" }}>
          <span>{i + 1}</span>
          <div>
            <h5>{item.place_name}</h5>
            {item.road_address_name ? (
              <div>
                <span>{item.road_address_name}</span>
                <span>{item.address_name}</span>
              </div>
            ) : (
              <span>{item.address_name}</span>
            )}
            <span>{item.phone}</span>
          </div>
        </div>
      ))}
      <div id="pagination"></div>
    </div>
  );
}
export default MapList;
