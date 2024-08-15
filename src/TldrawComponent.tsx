import { Tldraw, createShapeId } from "@tldraw/tldraw";
import { TLShapeId } from "@tldraw/tldraw";
import { useRef, useState } from "react";
import "tldraw/tldraw.css";

export default function TldrawComponent() {
  const ref = useRef<HTMLInputElement>(null);
  const [elementNumber, setElementNumber] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <div style={{ position: "fixed", width: "100%", height: "100vh" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <input
          onChange={(e: any) => {
            setElementNumber(e.target.value);
          }}
          style={{
            width: "25%",
            margin: "1rem 0rem 2rem 0rem",
            borderRadius: "7px",
            padding: "8px 12rem 8px 1rem",
          }}
          placeholder="Enter number of elements..."
        />
        <button
          style={{
            margin: "1rem 0rem 2rem 1rem",
            borderRadius: "7px",
            padding:"0 1rem 0 1rem",
            background: "#3b82f6",
            cursor:"pointer",
          }}
          onClick={()=>{
            console.log(elementNumber);
            setValue(elementNumber);
        
          }}
        >
          Go!
        </button>
      </div>
      <div ref={ref} style={{ position: "fixed", width: "100%", height: "100vh" }}>
      {(value!=0)?<Tldraw 
      key={value}
        hideUi={true}
        onMount={(editor) => {
          if (!editor) return; // Ensure editor is defined

          const horizontal = createShapeId();
          let s = 100;
          const ids: TLShapeId[] = [];
          const textId1s: TLShapeId[] = [];
          const textId2s: TLShapeId[] = [];
            const q = 1300 / (value-1);

            for (let i = 0; i < value; i++) {
              const textId1 = createShapeId();
              editor.createShape({
                id: textId1,
                type: "text",
                x: s + i * q,
                y: i % 2 ? 250 : 120,
                props: {
                  color: "black",
                  text: "Text " + (i+1),
                },
              });
              textId1s.push(textId1);

              const textId2 = createShapeId();
              editor.createShape({
                id: textId2,
                type: "text",
                x: s + i * q,
                y: i % 2 ? 280 : 90,
                props: {
                  color: "black",
                  text: "Heading "+(i+1),
                },
              });
              textId2s.push(textId2);

              const id = createShapeId();
              editor.createShape({
                id: id,
                type: "arrow",
                x: 100,
                y: 100,
                props: {
                  start: { x: s + i * q, y: 100 },
                  end: { x: s + i * q, y: i % 2 ? 130 : 70 },
                  color: "black",
                  size: "m",
                  dash: "solid",
                  arrowheadStart: "dot",
                  arrowheadEnd: "none",
                },
                isLocked: true,
              });
              ids.push(id);
            }
          

          editor.createShape({
            id: horizontal,
            type: "arrow",
            x: 100,
            y: 100,
            props: {
              start: { x: 0, y: 100 },
              end: { x: 1500, y: 100 },
              color: "black",
              size: "m",
              dash: "solid",
              arrowheadStart: "none",
              arrowheadEnd: "none",
            },
            isLocked: true,
          });
          ids.push(horizontal);

          return () => {
            ids.forEach((id) => editor.deleteShape(id));
          };
        }}
      />:<></>}

      </div>
      
    </div>
  );
}
