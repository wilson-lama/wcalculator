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
import { Separator } from "@/components/ui/separator"
import { Calculator, MoveRight, CircleAlert } from 'lucide-react';

const initialAmountValue = 0

function App() {
  // state
  const [wilsonAmount, setWilsonAmount] = useState(initialAmountValue)
  const [crystalAmount, setCrystalAmount] = useState(initialAmountValue)
  const [ashishAmount, setAshishAmount] = useState(initialAmountValue)

  const [wilsonPaysCrystal, setWilsonPaysCrystal] = useState(0)
  const [wilsonPaysAshish, setWilsonPaysAshish] = useState(0)
  const [crystalPaysWilson, setCrystalPaysWilson] = useState(0)
  const [crystalPaysAshish, setCrystalPaysAshish] = useState(0)
  const [ashishPaysWilson, setAshishPaysWilson] = useState(0)
  const [ashishPaysCrystal, setAshishPaysCrystal] = useState(0)

  const [wilsonAmountFixed, setWilsonAmountFixed] = useState(0)
  const [crystalAmountFixed, setCrystalAmountFixed] = useState(0)
  const [ashishAmountFixed, setAshishAmountFixed] = useState(0)

  let calculate = (event: React.FormEvent) => {
    if (Number.isNaN(wilsonAmount) || Number.isNaN(crystalAmount) || Number.isNaN(ashishAmount) || wilsonAmount < 0 || crystalAmount < 0 || ashishAmount < 0) {
      alert('Please enter a valid positive number')
    } else {
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

      setWilsonAmountFixed(wilsonAmount)
      setCrystalAmountFixed(crystalAmount)
      setAshishAmountFixed(ashishAmount)
    }
  }

  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className="container">
        <h1 style={{marginTop: 10 + "px", fontSize: 30 + "px"}}>Camping Calculator</h1>
        <h1 style={{marginTop: 10 + "px", textDecoration: "underline"}}>Person | Total Amount Spent</h1>
        <div style={{display: "flex", marginTop: 15 + "px"}}>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Input type="number" placeholder="Amount" value={wilsonAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setWilsonAmount(event.target.valueAsNumber)} />
        </div>
        <div style={{display: "flex", marginTop: 15 + "px"}}>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Input type="number" placeholder="Amount" value={crystalAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setCrystalAmount(event.target.valueAsNumber)} />
        </div>
        <div style={{display: "flex", marginTop: 15 + "px"}}>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <Input type="number" placeholder="Amount" value={ashishAmount} style={{width: 20 + "%", marginLeft: 20 + "px"}} onChange={(event) => setAshishAmount(event.target.valueAsNumber)} />
        </div>
        <div style={{display: "flex"}}>
          <form onSubmit={calculate}>
            <div style={{display: "flex", marginTop: 15 + "px"}}>
              <Button>
                <Calculator/> calculate!
              </Button>
            </div>
          </form>
          <form onSubmit={reload}>
                <Button style={{marginTop: 15 + "px", marginLeft: 10 + "px"}}>clear</Button>
          </form>
        </div>
        <Separator style={{marginTop: 15 + "px", marginBottom: 10 + "px", width: "full"}}/>
        <div>
          <h1 style={{marginTop: 10 + "px", marginBottom: 5 + "px", textDecoration: "underline"}}>Redistributions: </h1>
        </div>
        <div style={{display: "flex"}}>
          <div>
            <p style={{display: "flex"}}>Person A pays Person B ${wilsonPaysCrystal}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>Person A pays Person C ${wilsonPaysAshish}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>Person B pays Person A ${crystalPaysWilson}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>Person B pays Person C ${crystalPaysAshish}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>Person C pays Person A ${ashishPaysWilson}</p>
            <hr style={{backgroundColor: "black", height: 2 + "px", width: 300 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
            <p style={{display: "flex"}}>Person C pays Person B ${ashishPaysCrystal}</p>
          </div>
        </div>
        <Separator style={{marginTop: 15 + "px", marginBottom: 10 + "px", width: "full"}}/>
        <div style={{display: "flex", marginTop: 10 + "px", marginBottom: 5 + "px"}}>
          <h1 style={{color: "red", textDecoration: "underline black"}}>initial paid & paid to others</h1>
          <h1 style={{marginLeft: 3 + "px", marginRight: 3 + "px"}}>|</h1>
          <h1 style={{color: "green", textDecoration: "underline black"}}>received from others</h1>
          <h1 style={{marginLeft: 3 + "px", marginRight: 3 + "px"}}>|</h1>
          <h1 style={{textDecoration: "underline black"}}>total paid</h1>
        </div>
        <div>
          <div style={{display: "flex"}}>
            <p>Person A:</p>
          </div>
          <div style={{display: "flex"}}>
            <p>-</p>
            <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(wilsonAmountFixed) + Number(wilsonPaysCrystal) + Number(wilsonPaysAshish)}</p>
            <p style={{marginLeft: 10 + "px"}}>+</p>
            <p style={{color: "green", marginLeft: 10 + "px"}}>{crystalPaysWilson + ashishPaysWilson}</p>
            <p style={{marginLeft: 10 + "px"}}>=</p>
            <p style={{marginLeft: 10 + "px"}}>{Math.abs(-wilsonAmountFixed - (wilsonPaysCrystal + wilsonPaysAshish) + crystalPaysWilson + ashishPaysWilson)}</p>
          </div>
          <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
          <div style={{display: "flex"}}>
            <p>Person B:</p>
          </div>
          <div style={{display: "flex"}}>
            <p>-</p>
            <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(crystalAmountFixed) + Number(crystalPaysWilson) + Number(crystalPaysAshish)}</p>
            <p style={{marginLeft: 10 + "px"}}>+</p>
            <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysCrystal + ashishPaysCrystal}</p>
            <p style={{marginLeft: 10 + "px"}}>=</p>
            <p style={{marginLeft: 10 + "px"}}>{Math.abs(-crystalAmountFixed - (crystalPaysWilson + crystalPaysAshish) + wilsonPaysCrystal + ashishPaysCrystal)}</p>
          </div>
          <hr style={{backgroundColor: "black", height: 2 + "px", width: 170 + "px", marginTop: 5 + "px", marginBottom: 5 + "px"}}/>
          <div style={{display: "flex"}}>
            <p>Person C:</p>
          </div>
          <div style={{display: "flex"}}>
            <p>-</p>
            <p style={{color: "red", marginLeft: 10 + "px"}}>{Number(ashishAmountFixed) + Number(ashishPaysWilson) + Number(ashishPaysCrystal)}</p>
            <p style={{marginLeft: 10 + "px"}}>+</p>
            <p style={{color: "green", marginLeft: 10 + "px"}}>{wilsonPaysAshish + crystalPaysAshish}</p>
            <p style={{marginLeft: 10 + "px"}}>=</p>
            <p style={{marginLeft: 10 + "px"}}>{Math.abs(-ashishAmountFixed - (ashishPaysWilson + ashishPaysCrystal) + wilsonPaysAshish + crystalPaysAshish)}</p>
          </div>
        </div>
        <div style={{marginTop: 10 + "px"}}>
          <Badge variant="outline" style={{width: "full", height: 40 + "px", display: "flex"}}>
            <CircleAlert style={{height: 20 + "px"}}/>
            <p>heads up! this calculator rounds to the nearest dollar, so it will&nbsp;<u>not</u>&nbsp;be accurate to the decimal</p>
          </Badge>
        </div>
        <Separator style={{marginTop: 10 + "px", marginBottom: 10 + "px", width: "full"}}/>
        <div style={{width: "full"}}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How does this work? 🤔</AccordionTrigger>
              <AccordionContent>
                <p>Curious? This calculator uses what is known as a <a style={{textDecoration: "red underline", color: "red"}} href="https://www.geeksforgeeks.org/introduction-to-greedy-algorithm-data-structures-and-algorithm-tutorials/">greedy algorithm</a> in computer science. This type of algorithm is called "greedy" because it makes decisions based on the current state of the problem without considering future implications. This sounds great, but it can lead to problems down the line with optimization and time-complexity (aka making your algorithm run as fast as possible). However, for this project, it'll do just fine.</p>
                <br/>
                <p>The rough idea of this algorithm is to calculate the net amount for every person by subtracting all debts (amounts to pay) from all credits (amounts to be paid). Once the net amount for every person is evaluated, find the two people with maximum and minimum net amounts– they are the largest creditors and debtors. The person with minimum of the two will be the first person to be settled and removed from list. Let the minimum of two amounts be 𝒙. We pay 𝒙 amount from the maximum debtor to maximum creditor and settle one person. If 𝒙 is equal to the maximum debit, then the maximum debtor is settled, otherwise the maximum creditor is settled. Continue this process in a recursive loop until both the maximum credit and maximum debit are zero, or sufficiently small for your purposes.</p>
                <br/>
                <p>This project was built on a <a style={{textDecoration: "red underline", color: "red"}} href="https://nextjs.org/">next.js framework</a> with <a style={{textDecoration: "red underline", color: "red"}} href="https://react.dev/">React</a> and deployed via <a style={{textDecoration: "red underline", color: "red"}} href="https://vercel.com">Vercel</a>. The frontend was built using components from <a style={{textDecoration: "red underline", color: "red"}} href="https://ui.shadcn.com/">shadcn/ui</a>.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
              Wilson Lama. Source code available on{" "}
            <a
              href={"https://github.com/wilson-lama/wcalculator"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;