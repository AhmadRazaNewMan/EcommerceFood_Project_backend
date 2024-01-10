import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from "antd"
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

import DefaultLayout from '../components/DefaultLayout'

function HomePage() {
  const [itemData, setItemData] = useState([]);
  const [selectCategory, setSelectCategory] = useState('drinks')
  const categories = [
    {
      name: "drinks",
      imageUrl: "data:image/jpeg;base64,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"
    },
    {
      name: "rice",
      imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYBAgQDCAf/xAA9EAABAwIEAwYDBgENAAAAAAABAAIDBBEFEiExBkFRExQiYXGRMkKBBxUjobHBgiQmMzRSVHJzdJLR0uH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAAMAAQQDAQAAAAAAAAAAAQIDERIEITFhE0FRIv/aAAwDAQACEQMRAD8A/cUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEWt0GyLyknjiH4jgFAcV8UxYDhffGR9uS8NEYJBIvYkaW0uN1Xzx7zqfGrGDdZVF+z3jObH2SUtbD/ACimiZ2krXN8RtYuIvfU32FhpqrRimMU+HU75ZA95bG6QMaNSBa+/qPdPPH+pmNt5EldFG4HjFPjVE2qpQ5ovlfG+2ZjuhsSL/VSIVpe/CLLjeVlERECIiAiIgIiICIiAiIgLxqJmwRl7r9ABzK9HuDQXOIAAuSdgqnPxA3FTno4X/d7H+CqLsomcAQcuhOUa68+Xnlu3Y6sfLKiTrK+sdGcjGNA3DJPG7oBpuo4SySPe+adr3x20e8kMO9tP3ssT1HYUbpWsDXtcQ1pluHOJt81voOarfD3EFNitf3CJozNv4sjiXAalzhs217X6rzct2ey/wCfh06tc8fLJNTVsMVS2WXE3kxQuPd4TZutjfzItyI3O68MUidiWHTQzVErXVDSCIyGWvoATz38zuvDFs+SN9O2AzVDhE2FkbS63xHN9L/WyhnVlQ7EXNwcPqHAHPM85mkg6v8AJoO2pusZcuui3VhJU9gmGYVhIk7jTOiniaZMwjOYC13Nbext4Rob6qQqZ31EHZl7JnvbZ7WAtDAANC4EgHxc91xRT4jHPTxTxxhhjfKZYc5G4BDmWGpuCLnmSoTiyOZmFd+oZWRRunvJJCMj5SQGXJGmlmj0G/Jay/q3pqwuecmKVlp6vD43UWDyPoO3OeSoY0C79j4S2wuANR7EKd4TfikOGuGM1hnldIezMmXPl88uljuPJQ/D2Ix1eB0hqbyTObZ4ub3HhOa5N7kdOa7n0xqmRszu7MXAeCRc8iB06a7WU4789E7ff6W2y5dwy9vtaWSnNZxv5r3UVTF5p2wioY6oYwZngXF+V/ZZpsUj+8RhtUWx1hj7SMD4ZWjQlvodxy8916uOUykrzbOXiUREVkCIiAiIgIiICIiCJ4siln4ZxWOC/aupJQ0N3JynT6qs4BUUU+C4fLSvDqUQxszNcNbN1ba297+6vT2hzSHC4IsV844oMR4J4prKSgnfCIZLxj5XRnVptsdDb6Li9b6f82M5+lsff2XbHuITWzVNE1o7sXua8PaDnG23TRQDKeOlkbJAwRPb8L2XabeoUG3Ho5pnSVVPkLzf8I2A9L7KQhx2lyCOORrW9JBdePt0b8f693Vno8ZImG1znAtqfxX5S1krnkFt79Brv/zdWHh2kjwymdnkcZHgP8As02+EZuY1vpzKqDK+lePFl9Y5LfkQrBw/iEcg7vaR0LDmaZJh4HG+gtt135XVMJs+LFN2rX38mPys1PXVDsOmq3UTXtawGNgkDGy33Nzt9VFcY5ajDHUNJ2bsRqHxtdTU+V8h8V9TybYb+69o54Y6OOnbOGNiGW4JNzzuCSPNekeIYfE3I6vbC2PYvqQB+tl6OjX28tcvn4ZTOPGKKlwbD2Ya6Gaoq2t/G7ONzvERd1uVjqF0ULampzNqqQQRNjLxExjQ/U2H03UZUcR4NHO59TiVLIGtHZvhiDz5gusdb+YGqiMU47wmx7pFUzyAeF5fltp1N1fZ6O337Ffy+/8ApfOHY3sqCWxFrDF435iQ48reg0+gUHitU3EvtTwGCkkDu4Ry9oWm+rhcj6BrR/Evz/EuPcYqqTulO8UlPa2WK9yPM7+yt32JYNK+atx2qacpHd6dx+bW7yPLQD1uuj0uu69cwYbspllcn6yOayiLscwiIgIiICIiAiIgKj/adwceJKFtXQNaMTpW+C+nbM5sv15j/wBV4WCEs6S8fJ8jHxvdHKxzHsJa5rhYtI3BHVar6J4v4Fwnia88rXU1eBYVMO58nDZw/NflWM/ZjxJhz3GngjxCAbPpnAOt5sdr7ErK42NZlKpf1IWb+bvddVXhmIUbi2roKuEjcyQOA97WUeamnBsZ4gfN4VeLd+3tc9Sse68u9U/94i/3hdFNFLV/1SGWo/yWF/6Jz6OtEViw7gbifESO74RMxp+eciJo99fYFXzh37IYY3Nm4hrO2I1NNTEtZ6F25+llMxtVuXFD4N4SreKa8Rwh0VFG7+UVVtGDo3q79Nz5/Q2GYfT4XQQUNFGI6eBgYxo6Bb0dFTUNNHTUcMcEEYs2ONoAC6FpJxnb0REVkCIiAiIgIiICIiAiIgWReT6mCN4ZJNG152a5wBW5e0NLiQABck8kGSAdwCtHQQu+KKM+rQsySMjaXSPDGjcuNgkcscjc0b2vb1abhBoKWnBuIIh/AF6BrW/C0D0Cx2rMpdnblG5vosue1rS5xs0bk7BBmyzZYuFgSMLM4cMu+a+iDZFqXAWubXNhfmtkBERAREQEREBERAREQEREFXq3s+98TY6XDGFzY9KwXv4elxotpT/MGZuV1m0D2DNrms0gH0Nrj1Csbo2HVzGk+YWjnxt8Lnt3y2J3PRBHcSAmhiAibKe9weBxsHfiNXjhDLYxXONPFSPEcbXQRm+fciQ6AdQPQ3UsZ4MzGmWPM8AtGYXd0ss9rGC2723ccrddz0HsUEK+kP3scOBHcJb1bowPmDhdn+EuIcfO45r1x95ndBhzaV9U2Y56mNmX+iHLxEDV1hbpmUsJInvsHsLhcWvrpuPzC0FTTua57Zoy1pyucHAgG+3ug4eH5n91dSTskjmpXdnlkIL8nyEkEgnLYXvuCq7lkw/hi7WOfRVcfjaNexlLt7f2XHfodeZtcu1ia9zS9geBdwuL26rRtRTPbHlmiLZPgs4eK3Tqg5ca17j/AK2L91JrXKLbLZAREQEREBERAREQEREBERAXLPQxT5hICQ52Y687W06LqRBxdxHgHaPyta1ttPFlOl9P0STD45MuZ0ngcXNs+1iTe+m9j1uu1FHE9rkjoY46o1Lc2dwcCL6G5B/ZJqGOaLspM5jLy8tDi2979PM/kF1opOuWOkyTCXO4uDQ07eLzOix3JmencCfwGlrb2Oht/wBQutEOsDZZREQIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD//2Q=="
    }, {
      name: "noodles",
      imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX09ff3+Pr6+/3///8AAAA8PDwuLi61tbc5OTk2NjZMTU0xMTEoKChVVVXIycohISF3d3fBwsPl5ud/f3+QkJEQEA9ERESXmJiioqLd3t/T1NWJioqrq6xubm4KCQjr7O4ZGBhdXV1mZmZJt7PgAAADq0lEQVRoge2X25KkKBRF5aCiqFxEARXSy/9/ZB/NzOqah4mwx6yH6XBbDySFK3DjuZgkt27dunXr1q1bf70I4PUzZJqIKc/Hz9MJgDC2rrIy0s8Avwb7nuu6LLKiWhxcpaK3dB4oOcj7nmVVlLmUzaSvuQLQJmrwVkouAPds8jqv66IxbAB67TwJ7cYqNM6vZVbIVRX9IhsTxhnB9OJZEi22aVKuoa3MsqysVRjxWY4Nz/yqJ50LllV6aZdyhw/fjCD26mECHdIRL8FUmdXhO41u5upryEUWGr8Z6PJ6+4Lhez7Pm7oKD62JrgnFkK6B4iHuvhA6TjaX+XTRlgRaLQX60s5a5WnaN26gw5o2nunMXw0gBEtdab5WDxOE0F2xbEsjWLSlFFfzCmkpdyZ66UfH5VIoYRYv6twwI6/nLAKhEqmodyu0DirvmUud6NbqsuWHpItN6AOLWdn43PmHdn2z1sMnsi2wVFeTkoUJzBVcpMz0rM27zyRbUIWX02q9ilMRtsjSkRT8I6bs9LWcqq2pKrUuGK+1bws7f64EKdlgcin42nirpVv4B9kJDVldYOoqijyr8tp/tjBDEnhf5wjuMz9/yu/feDrr4INuL9affxPZ68TPdCp/g/YuDj5+qC/22GhQ6mfomOQZbf5j/B/dKznu3Z//eD3QBXjPUNG/4O9/n7eJCKuN5R2uJh23m8D0B66xqz4G3Cq2HHCSTNbGAddN3DbuHFxLuXarxGJgpXH8EYCsC5bp3gFsy+ZWmT93bmsXeDrQNXfBnDsDImTEKm8tCfj4kPAy0b2jAKucRT9hC6DkDqchHfd1kS4bpSebO4KWQkJVnqh+99U/hi7FLAjsIXyP3T55ek5VpWJUWUnNUkffnqLjvdgFPuF4A3WPtnvgrRAeY9jh8IbXAcVYAtrFXJ6i7xt7whm6QbEw4IzB9plXybhETC9rfcDZw6MdIyXYTFOshafgOj3g9QwxbaKUAmBKecS6D9ClWawK9JxbAJVyZdMhSTNjynI+ZcuosN0Bb2YCTG3d/q6BVtv0HrhBCegmsv9YDa4du21zJ2vT8wPwiApCX9n7n4N30Lxmyd5DnkK/9QQQ1DMOySsgyTsecbT/4cyfp3gXkmmifhyF0RAcwbrZuVb7EdRAtoCxGlrWJUENrDtl9/eN+3nuOhpcK8wIY5ydJg7hQQ+dAx/xq8O3bEL4zKY/hR/fneR1JYcJydOHwyPytOU5f+vWrVu3bt269b/XLxO+PDWcBZiXAAAAAElFTkSuQmCC"
    },
  ]
  const dispatch = useDispatch()

  // use Effect hook
  useEffect(() => {
    const getAllItem = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",

        })
        // destructure the whole data
        const { data } = await axios.get("/api/items/get-item"); // Added 'await' here
        console.log(data); // Corrected this line
        setItemData(data);
        dispatch({
          type: "HIDE_LOADING",

        })
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function
    getAllItem();
  }, [dispatch]); // Moved the closing bracket to the correct position

  return (
    <div>

      <DefaultLayout>
        <div className='d-flex'>
          {
            categories.map(category => (
              <div key={category.name} className={`d-flex category ${selectCategory === category.name && "category-active"}`} onClick={() => setSelectCategory(category.name)}>
                <h4>{category.name}</h4>
                <img src={category.imageUrl} alt={category.name} height={40} width={60} />
              </div>
            ))
          }



        </div>
        <Row>
          {
            itemData.filter((i)=>i.category===selectCategory).map(item => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))
          }
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default HomePage
