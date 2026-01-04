import React, { useState, useEffect } from "react";
import AddCouponModal from "@/components/Modals/AddCouponModal";
import { addCouponApi, getCouponsApi, deleteCouponApi, updateCouponApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import { Switch } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CouponsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getCouponsApi();
        const couponsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data.coupons)
          ? res.data.coupons
          : [];
        setCoupons(couponsArray);
      } catch (error) {
        toast.error("Failed to fetch coupons");
      }
    };
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (coupon) => {
    try {
      const payload = {
        coupon: coupon.code,
        percent: Number(coupon.discount),
        expiryDate: coupon.expiryDate,
      };
      await addCouponApi(payload);
      setCoupons([...coupons, coupon]);
      setShowModal(false);
      setEditingCoupon(null);
      toast.success("Coupon saved successfully!");
    } catch (error) {
      toast.error("Failed to save coupon");
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setShowModal(true);
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await deleteCouponApi(couponId);
      setCoupons(coupons.filter(c => c._id !== couponId));
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleToggleStatus = async (couponId, currentStatus) => {
    const newStatus = currentStatus === true || currentStatus === "active" ? "inactive" : "active";
    try {
      await updateCouponApi(couponId, { status: newStatus });
      setCoupons(coupons.map(c => c._id === couponId ? { ...c, status: newStatus } : c));
      toast.success("Coupon status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  async function fetchRoleAndSubscription() {
    const res = await axios.get("/user/role-subscription", {
      headers: {
        Authorization: `Bearer ${yourToken}` // get token from storage/cookie
      }
    });
    return res.data.user;
  }

  return (
    <div className="container-fluid ovh">
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="breadcrumb_title m-0">Coupons</h2>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-thm" onClick={() => { setShowModal(true); setEditingCoupon(null); }}>
            Add Coupon
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount (%)</th>
                <th>Expiry Date</th>
                <th>Expiry Status</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, idx) => (
                <tr key={idx}>
                  <td>{coupon.code || coupon.coupon}</td>
                  <td>{coupon.discount || coupon.percent}</td>
                  <td>{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : '-'}</td>
                  <td>
                    {coupon.expiryDate && new Date(coupon.expiryDate) < new Date()
                      ? 'Expired'
                      : 'Active'}
                  </td>
                  <td>
                    <Switch
                      checked={coupon.status === true || coupon.status === "active"}
                      onChange={() => handleToggleStatus(coupon._id, coupon.status)}
                      color="primary"
                    />
                  </td>
                  <td>
                    <button className="btn btn-profile-delete d-inline-block" onClick={() => handleDeleteCoupon(coupon._id)}>
                      <img className="img-fluid" src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCouponModal 
        show={showModal} 
        onClose={() => { setShowModal(false); setEditingCoupon(null); }} 
        onAdd={handleAddCoupon} 
        editingCoupon={editingCoupon}
      />
    </div>
  );
};

export default CouponsList; 