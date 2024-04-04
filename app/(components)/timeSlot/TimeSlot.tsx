import React from "react";

interface TimeSlotProps {
  time: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time }) => {
  return (
    <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
      <p className="font-bold text-[14px] text-[#0069FF]">{time}</p>
    </div>
  );
};

export default TimeSlot;
