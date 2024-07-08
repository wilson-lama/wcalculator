import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function FamilyModule() {
  return (
    <>
      <div style={{display: "flex", marginTop: 20 + "px"}}>
        <div style={{marginLeft: 20 + "px"}}>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a family" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="wilson">Wilson</SelectItem>
                <SelectItem value="crystal">Crystal</SelectItem>
                <SelectItem value="ashish">Ashish</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div style={{marginLeft: 10 + "px"}}>
          <Input type="number" placeholder="Amount"/>
        </div>
      </div>
    </>
  );
}