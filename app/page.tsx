'use client'
import Image from "next/image";
import { useState } from "react";
import { minCashFlow } from "./logic.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, MoveRight } from 'lucide-react';

function App() {
  // state
  const [wilsonAmount, setWilsonAmount] = useState(0)
  const [crystalAmount, setCrystalAmount] = useState(0)
  const [ashishAmount, setAshishAmount] = useState(0)

  const [wilsonPaysCrystal, setWilsonPaysCrystal] = useState(0)
  const [wilsonPaysAshish, setWilsonPaysAshish] = useState(0)
  const [crystalPaysWilson, setCrystalPaysWilson] = useState(0)
  const [crystalPaysAshish, setCrystalPaysAshish] = useState(0)
  const [ashishPaysWilson, setAshishPaysWilson] = useState(0)
  const [ashishPaysCrystal, setAshishPaysCrystal] = useState(0)

  let calculate = (event) => {
    // prevent submitting
    event.preventDefault()

    // graph[i][j] indicates the amount 
    // that person i needs to pay person j
    var graph = [ [0, crystalAmount / 3, ashishAmount / 3],
                  [wilsonAmount / 3, 0, ashishAmount / 3],
                  [wilsonAmount / 3, crystalAmount / 3, 0] ];

    let result = minCashFlow(graph) || [0, 0, 0, 0, 0, 0]

    // [w -> c, w -> a, c -> w, c -> a, a -> w, a -> c]
    setWilsonPaysCrystal(result[0])
    setWilsonPaysAshish(result[1])
    setCrystalPaysWilson(result[2])
    setCrystalPaysAshish(result[3])
    setAshishPaysWilson(result[4])
    setAshishPaysCrystal(result[5])
  }

  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="center">Wilson's Wcalculator</h1>
        <form onSubmit={calculate}>
          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://raw.githubusercontent.com/wilson-lama/wcalculator/main/public/wilson.png" />
              <AvatarFallback>WL</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>wilson & fam</Badge>
            <Input placeholder="Amount" value={wilsonAmount} style={{width: 10 + "%", marginLeft: 20 + "px"}} onChange={(event) => setWilsonAmount(event.target.value)} />
          </div>

          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>crystal & fam</Badge>
            <Input placeholder="Amount" value={crystalAmount} style={{width: 10 + "%", marginLeft: 20 + "px"}} onChange={(event) => setCrystalAmount(event.target.value)} />
          </div>

          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>ashish & fam</Badge>
            <Input placeholder="Amount" value={ashishAmount} style={{width: 10 + "%", marginLeft: 20 + "px"}} onChange={(event) => setAshishAmount(event.target.value)} />
          </div>


          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Button>
              <Calculator/> calculate!
            </Button>
          </div>
        </form>
        <form onSubmit={reload}>
              <Button style={{marginTop: 10 + "px"}}>clear</Button>
        </form>

        <div style={{display: "flex"}}>
          <div>
            <h1 style={{marginTop: 10 + "px", marginBottom: 5 + "px"}}>here ya go: </h1>
          </div>
          <div style={{display: "flex", marginTop: 10 + "px", marginBottom: 5 + "px", marginLeft: 3 + "px"}}>
            <h1 style={{color: "red"}}>initial paid & paid to others</h1>
            <h1 style={{marginLeft: 3 + "px", marginRight: 3 + "px"}}>|</h1>
            <h1 style={{color: "green"}}>received from others</h1>
            <h1 style={{marginLeft: 3 + "px", marginRight: 3 + "px"}}>|</h1>
            <h1>total paid</h1>
          </div>
        </div>
        <div style={{display: "flex"}}>
          <div>
            <p style={{display: "flex"}}>wilson<MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> crystal 🤑 | ${wilsonPaysCrystal}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>wilson <MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> ashish 🤑 | ${wilsonPaysAshish}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>crystal <MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> wilson 🤑 | ${crystalPaysWilson}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>crystal <MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> ashish 🤑 | ${crystalPaysAshish}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>ashish <MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> wilson 🤑 | ${ashishPaysWilson}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>ashish <MoveRight style={{marginLeft: 10 + "px", marginRight: 10 + "px"}}/> crystal 🤑 | ${ashishPaysCrystal}</p>
          </div>
          <div style={{marginLeft: 50 + "px"}}>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{wilsonAmount}</p>
              <p style={{marginLeft: 10 + "px"}}>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{wilsonPaysCrystal + wilsonPaysAshish}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{crystalPaysWilson}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{ashishPaysWilson}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{-wilsonAmount - (wilsonPaysCrystal + wilsonPaysAshish) + crystalPaysWilson + ashishPaysWilson}</p>
            </div>
            <div style={{display: "flex"}}>
              <p>test</p>
            </div>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{crystalAmount}</p>
              <p style={{marginLeft: 10 + "px"}}>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{crystalPaysWilson + crystalPaysAshish}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysCrystal}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{ashishPaysCrystal}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{-crystalAmount + (crystalPaysWilson + crystalPaysAshish) + wilsonPaysCrystal + ashishPaysCrystal}</p>
            </div>
            <div style={{display: "flex"}}>
              <p>test</p>
            </div>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{ashishAmount}</p>
              <p style={{marginLeft: 10 + "px"}}>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{ashishPaysWilson + ashishPaysCrystal}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysAshish}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{crystalPaysAshish}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{-ashishAmount + (ashishPaysWilson + ashishPaysCrystal) + wilsonPaysAshish + crystalPaysAshish}</p>
            </div>
            <div style={{display: "flex"}}>
              <p>test</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;