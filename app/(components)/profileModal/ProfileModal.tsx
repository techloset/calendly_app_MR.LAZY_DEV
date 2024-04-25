"use client";
import { Modal } from "antd";
import { useSession } from "next-auth/react";
import React from "react";

export interface Modalll {
  handleOk: () => void;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export default function ProfileModal({
  isModalOpen,
  handleCancel,
  handleOk,
}: Modalll) {
  const { data: sessions } = useSession();

  return (
    <Modal title="" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>
              <span className="font-bold" style={{ fontSize: "27px" }}>
                Invite User Link :-{" "}
              </span>{" "}
            </p>
          </div>
          <div className=" mt-6 w-[470px] flex items-center h-12 rounded-md border-[1px] border-gray-400 ">
            <span className="font-medium px-3" style={{ fontSize: "15px" }}>
              {`http://localhost:3000/goNext/${sessions?.user.email}`}
            </span>{" "}
          </div>
        </div>
      </div>
    </Modal>
  );
}
