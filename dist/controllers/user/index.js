"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidateLicenseController = exports.postValidateIdCardController = exports.patchUserAvatarController = exports.unblockUserController = exports.blockUserController = exports.deletedUsersController = exports.deletedUserController = exports.restoreUserController = exports.deleteUserController = exports.patchUserController = exports.postUserController = exports.getUserController = exports.getToValidateUsersController = exports.getUsersController = void 0;
const tslib_1 = require("tslib");
const user_1 = require("../../core/use-cases/user");
const block_user_1 = (0, tslib_1.__importDefault)(require("./block-user"));
const delete_user_1 = (0, tslib_1.__importDefault)(require("./delete-user"));
const deleted_user_1 = (0, tslib_1.__importDefault)(require("./deleted-user"));
const deleted_users_1 = (0, tslib_1.__importDefault)(require("./deleted-users"));
const get_to_validate_users_1 = (0, tslib_1.__importDefault)(require("./get-to-validate-users"));
const get_user_1 = (0, tslib_1.__importDefault)(require("./get-user"));
const get_users_1 = (0, tslib_1.__importDefault)(require("./get-users"));
const patch_user_1 = (0, tslib_1.__importDefault)(require("./patch-user"));
const patch_user_avatar_1 = (0, tslib_1.__importDefault)(require("./patch-user-avatar"));
const post_user_1 = (0, tslib_1.__importDefault)(require("./post-user"));
const post_validate_driver_license_1 = (0, tslib_1.__importDefault)(require("./post-validate-driver-license"));
const post_validate_id_card_1 = (0, tslib_1.__importDefault)(require("./post-validate-id-card"));
const restore_user_1 = (0, tslib_1.__importDefault)(require("./restore-user"));
const unblock_user_1 = (0, tslib_1.__importDefault)(require("./unblock-user"));
const getUsersController = (0, get_users_1.default)({ listUsers: user_1.listUsers });
exports.getUsersController = getUsersController;
const getToValidateUsersController = (0, get_to_validate_users_1.default)({ listToValidateUsers: user_1.listToValidateUsers });
exports.getToValidateUsersController = getToValidateUsersController;
const getUserController = (0, get_user_1.default)({ listUserInfos: user_1.listUserInfos });
exports.getUserController = getUserController;
const postUserController = (0, post_user_1.default)({ addUser: user_1.addUser });
exports.postUserController = postUserController;
const patchUserController = (0, patch_user_1.default)({ editUser: user_1.editUser });
exports.patchUserController = patchUserController;
const deleteUserController = (0, delete_user_1.default)({ removeUser: user_1.removeUser });
exports.deleteUserController = deleteUserController;
const restoreUserController = (0, restore_user_1.default)({ restoreUser: user_1.restoreUser });
exports.restoreUserController = restoreUserController;
const deletedUserController = (0, deleted_user_1.default)({ listRemovedUserInfos: user_1.listRemovedUserInfos });
exports.deletedUserController = deletedUserController;
const deletedUsersController = (0, deleted_users_1.default)({ listRemovedUsers: user_1.listRemovedUsers });
exports.deletedUsersController = deletedUsersController;
const blockUserController = (0, block_user_1.default)({ blockUser: user_1.blockUser });
exports.blockUserController = blockUserController;
const unblockUserController = (0, unblock_user_1.default)({ unblockUser: user_1.unblockUser });
exports.unblockUserController = unblockUserController;
const patchUserAvatarController = (0, patch_user_avatar_1.default)({ editUserAvatar: user_1.editUserAvatar });
exports.patchUserAvatarController = patchUserAvatarController;
const postValidateIdCardController = (0, post_validate_id_card_1.default)({ validateUserIdCard: user_1.validateUserIdCard });
exports.postValidateIdCardController = postValidateIdCardController;
const postValidateLicenseController = (0, post_validate_driver_license_1.default)({ validateDriverLicense: user_1.validateDriverLicense });
exports.postValidateLicenseController = postValidateLicenseController;
//# sourceMappingURL=index.js.map