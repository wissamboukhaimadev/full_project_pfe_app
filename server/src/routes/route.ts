import * as express from "express"
import { amphie_export, amphie_realtime_forward, getAmphi_data, getAmphie_chart_data, insertAmphi_data } from "../controller/amphie_controller"
import { getGEDepatment_data, insertGEDepatment_data, GEDepatment_export, GEDepatment_realtime_forward, getGe_chart_data } from "../controller/geDepartment_controller"
import { getGbiDepartment_data, insertGbiDepartment_data, GbiDepartment_export, GbiDepartment_realtime_forward, getGBI_chart_data } from "../controller/gbiDepartment_controller"
import { getPFE_chart_data, getPfeRoom_data, insertPfeRoom_data, PfeRoom_export, PfeRoom_realtime_forward } from "../controller/pfeRoom_controller"
import { getGlobal_chart_data, getGlobal_data, global_export, global_realtime_forward, insertGlobal_data } from "../controller/global_controller"
import { adminAuthentication } from "../controller/authentication"

const router = express.Router()


// Amphie endpoints
router.route("/amphie").get(getAmphi_data)
router.route("/amphie/insert").post(insertAmphi_data)
router.route("/amphie/realtime").post(amphie_realtime_forward)
router.route("/amphie/export").get(amphie_export)
router.route("/amphie/chart").post(getAmphie_chart_data)


// Global endpoints
router.route("/global").get(getGlobal_data)
router.route("/global/insert").post(insertGlobal_data)
router.route("/global/realtime").post(global_realtime_forward)
router.route("/global/export").get(global_export)
router.route("/global/chart").post(getGlobal_chart_data)


// Etage1 endpoints
router.route("/ge_department").get(getGEDepatment_data)
router.route("/ge_department/insert").post(insertGEDepatment_data)
router.route("/ge_department/realtime").post(GEDepatment_realtime_forward)
router.route("/ge_department/export").get(GEDepatment_export)
router.route("/ge_department/chart").post(getGe_chart_data)


// Etage2 endpoints
router.route("/gbi_department").get(getGbiDepartment_data)
router.route("/gbi_department/insert").post(insertGbiDepartment_data)
router.route("/gbi_department/realtime").post(GbiDepartment_realtime_forward)
router.route("/gbi_department/export").get(GbiDepartment_export)
router.route("/gbi_department/chart").post(getGBI_chart_data)


// etage3 endpoints
router.route("/pfe_room").get(getPfeRoom_data)
router.route("/pfe_room/insert").post(insertPfeRoom_data)
router.route("/pfe_room/realtime").post(PfeRoom_realtime_forward)
router.route("/pfe_room/export").get(PfeRoom_export)
router.route("/pfe_room/chart").post(getPFE_chart_data)


// authentication
router.route("/login").post(adminAuthentication)



export default router;