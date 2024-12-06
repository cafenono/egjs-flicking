/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useRef, useState } from "react";
import { CrossFlicking, CrossGroup, DIRECTION } from "@egjs/react-flicking";
import "../../css/demo/crossflicking.css";

export default () => {
  const flicking = useRef<CrossFlicking>();
  const tabRef = useRef<null[] | HTMLDivElement[]>([]);
  const [opacity, setOpacity] = useState(1);
  const [page, setPage] = useState([0, 0, 0, 0]);
  const [panelCount, setPanelCount] = useState(4);
  const [transform, setTransform] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState("");
  const groups = [
    {
      name: "Spring",
      panels: [
        {
          title: "Cherry blossoms, Bird, Flowers",
          image:
            "https://cdn.pixabay.com/photo/2022/01/17/01/19/cherry-blossoms-6943659_1280.jpg",
        },
        {
          title: "Tulips, Daffodils, Flowers",
          image:
            "https://cdn.pixabay.com/photo/2016/02/13/10/35/tulips-1197602_1280.jpg",
        },
        {
          title: "Lin zhi, Tibet, Snow mountain",
          image:
            "https://cdn.pixabay.com/photo/2022/04/23/07/38/lin-zhi-7151302_1280.jpg",
        },
        {
          title: "Flowers, Beautiful flowers, Spring",
          image:
            "https://cdn.pixabay.com/photo/2015/03/26/11/06/flowers-692433_1280.jpg",
        },
        {
          title: "Spring, Flowering tree, Flower",
          image:
            "https://cdn.pixabay.com/photo/2019/05/06/19/20/spring-4183996_1280.jpg",
        },
      ],
    },
    {
      name: "Summer",
      panels: [
        {
          title: "Mountains, Lake, Trees",
          image:
            "https://cdn.pixabay.com/photo/2023/03/28/19/54/mountains-7884039_1280.jpg",
        },
        {
          title: "Beach, Sea, Island",
          image:
            "https://cdn.pixabay.com/photo/2021/08/01/12/58/beach-6514331_1280.jpg",
        },
        {
          title: "Vineyards, Nature, Vines",
          image:
            "https://cdn.pixabay.com/photo/2019/07/14/10/48/vineyards-4336787_1280.jpg",
        },
        {
          title: "Field, Sunflowers, Tree",
          image:
            "https://cdn.pixabay.com/photo/2020/07/06/06/57/field-5375784_1280.jpg",
        },
        {
          title:
            "Sea, Lighthouse, Horizon",
          image:
            "https://cdn.pixabay.com/photo/2022/09/11/09/26/sea-7446433_1280.jpg",
        },
      ],
    },
    {
      name: "Autumn",
      panels: [
        {
          title:
            "Nature, Forest, Trees",
          image:
            "https://cdn.pixabay.com/photo/2021/11/22/16/46/nature-6816877_1280.jpg",
        },
        {
          title: "Path, Trees, Autumn",
          image:
            "https://cdn.pixabay.com/photo/2019/10/31/06/58/path-4591121_960_720.jpg",
        },
        {
          title: "Maple leaves, Autumn, Leaves",
          image:
            "https://cdn.pixabay.com/photo/2017/09/26/16/32/maple-leaves-2789234_1280.jpg",
        },
        {
          title: "Forest, Nature, Autumn",
          image:
            "https://cdn.pixabay.com/photo/2019/10/19/13/00/forest-4561344_1280.jpg",
        },
      ],
    },
    {
      name: "Winter",
      panels: [
        {
          title:
            "Snowy landscape, Winter",
          image:
            "https://cdn.pixabay.com/photo/2016/11/13/13/47/snowy-landscape-1821037_1280.jpg",
        },
        {
          title: "Winter, Hochybrig, Pre-alps",
          image:
            "https://cdn.pixabay.com/photo/2019/12/15/18/24/winter-4697776_1280.jpg",
        },
        {
          title: "Road, Forest, Snow",
          image:
            "https://cdn.pixabay.com/photo/2021/01/09/20/23/road-5903402_1280.jpg",
        },
        {
          title: "Winter forest, Conifer, Snow",
          image:
            "https://cdn.pixabay.com/photo/2022/12/14/10/33/winter-forest-7655125_1280.jpg",
        },
        {
          title: "Snow, Mountain, Winter",
          image:
            "https://cdn.pixabay.com/photo/2018/04/09/16/24/snow-3304547_1280.jpg",
        },
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  const onChanged = (e) => {
    const cameraPos = e.currentTarget.camera.position;
    setIndex(e.index);
    setOpacity(1);
    setSelectedWidth(`${tabRef.current[e.index]?.getBoundingClientRect().width}px`);
    setPanelCount(groups[e.index].panels.length);
  };

  const onSideChanged = (e) => {
    setPage(page.map((prev, i) => {
      if (i < e.mainIndex) {
        e.index = e.index - groups[i].panels.length;
      } else if (i === e.mainIndex) {
        return e.index;
      }
      return prev;
    }));
  };

  const onMove = (e) => {
    const start = tabRef.current[e.currentTarget.index]!.getBoundingClientRect().x - tabRef.current[0]!.getBoundingClientRect().x;
    const next = e.currentTarget.index + (e.currentTarget.visiblePanels[0].index === e.currentTarget.index ? 1 : -1);
    if (next >= 0 && next <= groups.length - 1) {
      const cameraPos = e.currentTarget.camera.position;
      const visibleLists = e.currentTarget.visiblePanels.map(p => {
        return {
          panelIndex: p.index,
          diff: p.position - cameraPos,
        };
      });
      const size = e.currentTarget.currentPanel.size;
      const half = size / 2;
      const end = (tabRef.current[next]!.getBoundingClientRect().x - tabRef.current[e.currentTarget.index]!.getBoundingClientRect().x);

      const { diff = 0 } = visibleLists.find(item => item.panelIndex === index) ?? {};
      const ratio = Math.max(-1, Math.min(1, Math.abs(diff / size))) || 1;

      if (e.isTrusted) {
      }
      setOpacity(Math.max(0, Math.min(1, 1 - Math.abs(diff / half))));
      setTransform((cameraPos - 200) / 5);
    }
  };

  const onSideMove = (e) => {
    const cameraPos = e.currentTarget.camera.position;
    const visibleLists = e.currentTarget.visiblePanels.map(p => {
      return {
        panelIndex: p.index,
        diff: p.position - cameraPos,
      };
    });
    const size = e.currentTarget.currentPanel.size;
    const half = size / 2;
    
    const { diff = 0 } = visibleLists.find(item => item.panelIndex === index) ?? {};;

    setOpacity(Math.max(0, Math.min(1, 1 - Math.abs(diff / half))));
  };

  const onTabClick = (i: number) => {
    if (!flicking.current?.animating) {
      setIndex(i);
      flicking.current?.moveTo(i, 500).catch(() => void 0);
    }
  };

  useEffect(() => {
    flicking.current?.moveTo(0, 0);
    setSelectedWidth(`${tabRef.current[0]?.getBoundingClientRect().width}px`);
  }, []);

  return (
    <div className="demo">
      <div className="labels">
        {selectedWidth && <a
          className="area selected"
          style={{ width: selectedWidth, transform: `translate(${transform}px)` }}
        >
        </a>}
        {groups.map((item, i) => (
          <div className="tab" ref={el => tabRef.current[i] = el} key={i}>
            <a
              className={"label " + (index === i ? "" : "")}
              onClick={() => onTabClick(i)}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <CrossFlicking
        className="main"
        ref={flicking}
        bounce={0.1}
        preventDefaultOnDrag={true}
        moveType={"strict"}
        sideOptions={{
          bounce: 0.1,
          moveType: "strict",
        }}
        onMove={onMove}
        onSideMove={onSideMove}
        onChanged={onChanged}
        onSideChanged={onSideChanged}
      >
        {groups.map((item, i) => {
          return (
            <CrossGroup key={i}>
              {item.panels.map((panel, j) => {
                return (
                  <div className="item" key={j}>
                    <img className="img scaleup" src={panel.image} />
                  </div>
                );
              })}
            </CrossGroup>
          );
        })}
      </CrossFlicking>
      <div className="info" style={{ opacity: opacity }}>
        <div className="name">
          <span className="source">
            {groups[index].name} Wallpaper
          </span>
        </div>
        <strong className="headline">{groups[index].panels[page[index]].title}</strong>
      </div>
      <div className="page">
        {Array.from({ length: panelCount }).map((_, i) => {
          return <span key={i} className={`dot ${i === page[index] ? "on" : ""}`}>{i + 1}</span>;
        })}
      </div>
    </div>
  );
};
