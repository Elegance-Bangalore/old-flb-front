import PostPropertyMain from '@/MainRoles/Seller/Features/ManageProperties/Components/PropertyList/PostPropertyMain'
import SellerNewSidebar from '@/MainRoles/Seller/Layouts/SellerNewSideBar'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/Redux/Auth/authSlice'
import SubscriptionModal from '@/components/Modals/SubscriptionModal'
import { useNavigate } from 'react-router-dom'

function SellerPostPropertyPage() {

  const [isDirty, setIsDirty] = useState(false)
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [url, setUrl] = useState(null)
  const [formValues, setFormValues] = useState({})
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  function getUrl(url) {
    setUrl(url)
  }

  return (
    <SellerNewSidebar isDirty={isDirty} setShowUnsavedChangesModal={setShowUnsavedChangesModal} getUrl={getUrl} formValues={formValues} status={formValues.status}>
      {user?.subscription ? (
        <PostPropertyMain setIsDirty={setIsDirty} showUnsavedChangesModal={showUnsavedChangesModal} url={url} setFormValues={setFormValues} />
      ) : (
        <SubscriptionModal show={true} handleClose={() => navigate(-1)} />
      )}
    </SellerNewSidebar>
  )
}

export default SellerPostPropertyPage