﻿var Patients = function () {

    var initPatientsDataTable = function () {
        $(document).ready(function () {
            window.patientsTable = $("#patients_datatable").DataTable({
                "processing": true,
                "serverSide": true,
                "filter": true,
                "orderMulti": false,
                "initComplete": function (settings, json) {
                    newPatientsModalShow();
                },
                "ajax": {
                    "url": "/Patients/LoadData",
                    "type": "POST",
                    "datatype": "json"
                },
                "columns": [
                    { "data": "rM2Number", "name": "RM2Number", "autoWidth": true },
                    { "data": "firstName", "name": "FirstName", "autoWidth": true },
                    { "data": "lastName", "name": "LastName", "autoWidth": true },
                    { "data": "gender", "name": "Gender", "autoWidth": true },
                    { "data": "dob", "name": "DOB", "autoWidth": true },
                    {
                        "render": function (data, type, patient, meta) {
                            return '<a class="btn btn-info patient-details" href="/Patients/Details/' + patient.id + '"><i class=\'fa fa-eye\'></i>&nbsp;Details</a>&nbsp;' +
                                '<a class="btn btn-warning patient-edit" href="/Patients/Edit/' + patient.id + '"><i class=\'fa fa-edit\' ></i>&nbsp;Edit</a>&nbsp;' +
                                '<a class="btn btn-danger patient-delete" href="javascript:void(0)" data-id="' + patient.id + '"><i class=\'fa fa-trash\' ></i>&nbsp;Delete</a>&nbsp;';
                        },
                        "sortable": false
                    }
                ]

            });
        });
    }

    var submitNewPatient = function () {
        $(document).off("click.save-patient").on("click.save-patient", "button.submit-new-patient", function () {
            $("label.text-danger").remove();
            $.ajax({
                url: $("form#new-patient-form").attr("action"),
                type: "POST",
                data: $("form#new-patient-form").serialize(),
                contentType: "application/x-www-form-urlencoded",
                dataType: 'json'
            }).done(function (data, textStatus) {
                if (textStatus === "success") {
                    if (data.errors) {
                        displayErrors(data.errors);
                    } else {
                        $("form#new-patient-form")[0].reset();
                        $("div#new-patient-modal").modal("hide");
                        window.patientsTable.ajax.reload();
                    }
                }
            }).fail(function (data) {
                $("form#new-patient-form")[0].reset();
                $("div#new-patient-modal").modal("hide");
                alert("There was a problem saving this patient. Please contact administrator");
            });

        });
    }

    var displayErrors = function (errors) {
        for (var i = 0; i < Object.keys(errors).length; i++) {
            var field = Object.keys(errors)[i];
            if (field.match("diagnoses") || field.match("drugs")) {
                field = field.charAt(0).toUpperCase() + field.slice(1).replace("[", "_").replace("].", "__");
            }
            var htmlCode = "<label for='" + field + "' class='text-danger'></label>";
            var fieldError = errors[Object.keys(errors)[i]];
            $(htmlCode).html(fieldError).appendTo($("input#" + field + ", select#" + field).parent());
        }
    }

    var enableAntiForgeryProtectionWithAjax = function () {
        $(document)
            .ajaxSend(function (event, jqxhr, settings) {
                if (settings.type.toUpperCase() !== "POST") return;
                jqxhr.setRequestHeader('RequestVerificationToken', $(".AntiForge" + " input").val())
            })
    };

    var newPatientsModalShow = function () {
        $(document).off("click.launch-new-patient-modal").on("click.launch-new-patient-modal", "a.new-patient-modal-show", function () {
            $.get("/Patients/New", function (responseHtml) {
                $("div#modal-container").html(responseHtml);
                $("div#new-patient-modal").modal("show");
            });
        });
    }

    var bindDiagnosisFormOnClick = function () {
        $(document).off("click.add-diagnosis").on("click.add-diagnosis", "a.add-diagnosis", function (e) {
            e.preventDefault();
            $.get($(this).attr("href"), function (responseHtml) {
                $("div.diagnosis-form").append(responseHtml);
            });
        })
    }

    var bindDiagnosisEditFormOnClick = function () {
        $(document).off("click.add-edit-diagnosis").on("click.add-edit-diagnosis", "a.add-edit-diagnosis", function (e) {
            e.preventDefault();
            var index = $("div.diagnosis-row:visible").length;
            $.get($(this).attr("href") + "?index=" + index, function (responseHtml) {
                $("div.diagnosis-form").append(responseHtml);
            });
        })
    }

    var bindDrugsFormOnClick = function () {
        $(document).off("click.add-drug").on("click.add-drug", "a.add-drug", function (e) {
            e.preventDefault();
            $.get($(this).attr("href"), function (responseHtml) {
                $("div.drug-form").append(responseHtml);
            });
        })
    }

    var bindDrugsEditFormOnClick = function () {
        $(document).off("click.add-edit-drug").on("click.add-edit-drug", "a.add-edit-drug", function (e) {
            e.preventDefault();
            var index = $("div.drug-row:visible").length;
            $.get($(this).attr("href") + "?index=" + index, function (responseHtml) {
                $("div.drug-form").append(responseHtml);
            });
        })
    }

    var bindPatientDetailsShow = function () {
        $(document).off("click.patient-details").on("click.patient-details", "a.patient-details", function (e) {
            e.preventDefault();
            $.get($(this).attr("href"), function (responseHtml) {
                $("div#modal-container").html(responseHtml);
                $("div#details-modal").modal("show");
            });
        });
    }

    var bindPatientEdit = function () {
        $(document).off("click.patient-edit").on("click.patient-edit", "a.patient-edit", function (e) {
            e.preventDefault();
            $.get($(this).attr("href"), function (responseHtml) {
                $("div#modal-container").html(responseHtml);
                $("div#edit-modal").modal("show");
                updatePatient();
            });
        });
    }

    var updatePatient = function () {
        $(document).off("click.update-patient").on("click.update-patient", "button.update-patient", function () {
            $("label.text-danger").remove();
            $.ajax({
                url: $("form#edit-patient-form").attr("action"),
                type: "POST",
                data: $("form#edit-patient-form").serialize(),
                contentType: "application/x-www-form-urlencoded",
                dataType: 'json'
            }).done(function (data, textStatus) {
                if (textStatus === "success") {
                    if (data.errors) {
                        displayErrors(data.errors);
                    } else {
                        $("form#edit-patient-form")[0].reset();
                        $("div#edit-modal").modal("hide");
                        window.patientsTable.ajax.reload();
                    }
                }
            }).fail(function (data) {
                $("form#edit-patient-form")[0].reset();
                $("div#edit-modal").modal("hide");
                alert("There was a problem saving this patient. Please contact administrator");
            });

        });
    }

    var bindOnDeletePatientClick = function () {
        $(document).off("click.patient-delete").on("click.patient-delete", "a.patient-delete", function () {
            var patientId = $(this).data("id");
            var question = 'Are you sure you want to delete this patient and all related data?';
            BootstrapDialog.confirm(question, function (result, dialog) {
                if (result) {
                    $.ajax({
                        url: "/Patients/Delete/" + patientId,
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded",
                        dataType: 'json'
                    }).done(function (data, textStatus) {
                        if (textStatus === "success") {
                            window.patientsTable.ajax.reload();
                        }
                    });
                }
            });
        });        
    }

    return {

        bindPatientsModals: function () {
            newPatientsModalShow();
            bindDiagnosisFormOnClick();
            bindDrugsFormOnClick();
            bindPatientDetailsShow();
            bindPatientEdit();
            bindDiagnosisEditFormOnClick();
            bindDrugsEditFormOnClick();
            bindOnDeletePatientClick();
        },

        setupForm: function () {
            submitNewPatient();
            enableAntiForgeryProtectionWithAjax();
        },

        init: function () {
            initPatientsDataTable();
            submitNewPatient();
            enableAntiForgeryProtectionWithAjax();
        }
    }

}();