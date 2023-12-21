export const codesVtruApi = {
    success: {
        login: [
            'vitruveo.studio.api.admin.creators.login.success',
            'vitruveo.studio.api.admin.creators.login.otpConfirm.success',
        ],
        user: [
            'vitruveo.studio.api.admin.creators.username.success',
            'vitruveo.studio.api.admin.creators.send.code.email.success',
            'vitruveo.studio.api.admin.creators.verify.code.email.success',
        ],
    },
    errors: {
        user: ['Creator add email failed: email already exist'],
    },
    notfound: {
        user: [
            'vitruveo.studio.api.admin.creators.username.not.found',
            'vitruveo.studio.api.admin.creators.email.not.found',
        ],
    },
};
