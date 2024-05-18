import * as express from "express"
import { amphie_export, amphie_realtime_forward, getAmphi_data, insertAmphi_data } from "../controller/amphie_controller"
import { getStage1_data, insertStage1_data, stage1_export, stage1_realtime_forward } from "../controller/stage1_controller"
import { getStage2_data, insertStage2_data, stage2_export, stage2_realtime_forward } from "../controller/stage2_controller"
import { getStage3_data, insertStage3_data, stage3_export, stage3_realtime_forward } from "../controller/stage3_controller"
import { getGlobal_data, global_export, global_realtime_forward, insertGlobal_data } from "../controller/global_controller"
import { adminAuthentication } from "../controller/authentication"

const router = express.Router()


// Amphie endpoints
router.route("/amphie").get(getAmphi_data)
router.route("/amphie/insert").post(insertAmphi_data)
router.route("/amphie/realtime").post(amphie_realtime_forward)
router.route("/amphie/export").get(amphie_export)


// Global endpoints
router.route("/global").get(getGlobal_data)
router.route("/global/insert").post(insertGlobal_data)
router.route("/global/realtime").post(global_realtime_forward)
router.route("/global/export").get(global_export)


// Etage1 endpoints
router.route("/stage1").get(getStage1_data)
router.route("/stage1/insert").post(insertStage1_data)
router.route("/stage1/realtime").post(stage1_realtime_forward)
router.route("/stage1/export").get(stage1_export)


// Etage2 endpoints
router.route("/stage2").get(getStage2_data)
router.route("/stage2/insert").post(insertStage2_data)
router.route("/stage2/realtime").post(stage2_realtime_forward)
router.route("/stage2/export").get(stage2_export)


// etage3 endpoints
router.route("/stage3").get(getStage3_data)
router.route("/stage3/insert").post(insertStage3_data)
router.route("/stage3/realtime").post(stage3_realtime_forward)
router.route("/stage3/export").get(stage3_export)


// authentication
router.route("/login").post(adminAuthentication)



export default router;