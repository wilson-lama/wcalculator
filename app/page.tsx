'use client'
import Image from "next/image";
import { useState } from "react";
import { minCashFlow } from "./logic.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
        <h1 style={{marginTop: 10 + "px"}}>Wil's Weally Wonderful Wcamping Wcalculator</h1>
        <form onSubmit={calculate}>
          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://raw.githubusercontent.com/wilson-lama/wcalculator/main/public/wilson.png" />
              <AvatarFallback>WL</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>wilson & fam</Badge>
            <Input placeholder="Amount" value={wilsonAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setWilsonAmount(event.target.value)} />
          </div>

          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>crystal & fam</Badge>
            <Input placeholder="Amount" value={crystalAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setCrystalAmount(event.target.value)} />
          </div>

          <div style={{display: "flex", marginTop: 15 + "px"}}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Badge variant="default" style={{marginLeft: 15 + "px", height: 25 + "px"}}>ashish & fam</Badge>
            <Input placeholder="Amount" value={ashishAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setAshishAmount(event.target.value)} />
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
              <p>wil:</p>
            </div>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(wilsonAmount) + Number(wilsonPaysCrystal) + Number(wilsonPaysAshish)}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{crystalPaysWilson + ashishPaysWilson}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{Math.abs(-wilsonAmount - (wilsonPaysCrystal + wilsonPaysAshish) + crystalPaysWilson + ashishPaysWilson)}</p>
            </div>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <div style={{display: "flex"}}>
              <p>crys:</p>
            </div>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(crystalAmount) + Number(crystalPaysWilson) + Number(crystalPaysAshish)}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysCrystal + ashishPaysCrystal}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{Math.abs(-crystalAmount - (crystalPaysWilson + crystalPaysAshish) + wilsonPaysCrystal + ashishPaysCrystal)}</p>
            </div>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <div style={{display: "flex"}}>
              <p>ash:</p>
            </div>
            <div style={{display: "flex"}}>
              <p>-</p>
              <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(ashishAmount) + Number(ashishPaysWilson) + Number(ashishPaysCrystal)}</p>
              <p style={{marginLeft: 10 + "px"}}>+</p>
              <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysAshish + crystalPaysAshish}</p>
              <p style={{marginLeft: 10 + "px"}}>=</p>
              <p style={{marginLeft: 10 + "px"}}>{Math.abs(-ashishAmount - (ashishPaysWilson + ashishPaysCrystal) + wilsonPaysAshish + crystalPaysAshish)}</p>
            </div>
          </div>
        </div>
        <div style={{marginTop: 100 + "px", width: 50 + "%"}}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How does this work? 🤔</AccordionTrigger>
              <AccordionContent>
                <p>Curious, aren't ya? This project uses what's called a <a style={{textDecoration: "red wavy underline"}} href="https://www.geeksforgeeks.org/introduction-to-greedy-algorithm-data-structures-and-algorithm-tutorials/">greedy algorithm</a> in computer science. This type of algorithm is called "greedy" because it makes decisions based on the current state of the problem without considering the future. This sounds great, but it can lead some problems down the line with optimization and time-complexity (making your algorithm run as fast as possible).</p>
                <br/>
                <p>The rough idea of this algorithm is to calculate the net amount for every person by subtracting all debts (amounts to pay) from all credits (amounts to be paid). Once the net amount for every person is evaluated, find the two people with maximum and minimum net amounts– they are the largest creditors and debtors. The person with minimum of the two will be the first person to be settled and removed from list. Let the minimum of two amounts be 𝒙. We pay 𝒙 amount from the maximum debtor to maximum creditor and settle one person. If x is equal to the maximum debit, then maximum debtor is settled, otherwise the maximum creditor is settled. Continue this process in a recursive loop until both the maximum credit and maximum are zero, or sufficiently small for your purposes.</p>
                <br/>
                <p> Crystal the cool cow and Ashish the artistic armadillo– this won't mean much to you now, but if you get into coding later, this project was built on a <a style={{textDecoration: "red underline"}} href="https://nextjs.org/">next.js framework</a> with <a style={{textDecoration: "red underline"}} href="https://react.dev/">React</a> and deployed via <a style={{textDecoration: "red underline"}} href="https://vercel.com">Vercel</a>. The frontend was built using components from <a style={{textDecoration: "red underline"}} href="https://ui.shadcn.com/">shadcn/ui</a>.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default App;