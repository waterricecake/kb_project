import React, { useEffect, useState } from "react";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markerPosition = new kakao.maps.LatLng(37.5208119, 126.9278776);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.5208119, 126.9278776),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    marker.setMap(map);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
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

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div className="listMapContainer">
      <div className="listContainer" id="result-list">
        {Places.map((item, i) => (
          <div
            key={i}
            style={{ padding: "20px", borderBottom: "2px solid #acacac" }}
          >
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <div className="addressName">{item.road_address_name}</div>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span
                style={{
                  fontSize: "15px",
                  color: "#238CFA",
                }}
              >
                {item.phone}
              </span>
            </div>
          </div>
        ))}
        <div className="pageNation" id="pagination"></div>
      </div>
      <div
        id="myMap"
        style={{
          width: "600px",
          height: "500px",
        }}
      ></div>
    </div>
  );
};

export default MapContainer;
